import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type {
  FunctionTool,
  ResponseFunctionToolCall,
  ResponseInputItem,
  ResponseOutputItem,
} from "openai/resources/responses/responses";
import { z } from "zod";
import { WHATSAPP_URL } from "@/lib/chatbot/constants";
import { SYSTEM_PROMPT } from "@/lib/chatbot/knowledge";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { sendLeadToTelegram } from "@/lib/telegram";

export const maxDuration = 30;

const MAX_USER_MESSAGES = 20;
const MAX_USER_CHARS = 500;
const MAX_TOOL_ROUNDS = 2;

const MESSAGE_SCHEMA = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
});

const BODY_SCHEMA = z.object({
  messages: z.array(MESSAGE_SCHEMA).min(1).max(MAX_USER_MESSAGES * 2),
});

const LEAD_SCHEMA = z.object({
  nama: z.string().trim().min(2).max(100),
  kontak: z.string().trim().min(5).max(150),
  kebutuhan: z.string().trim().min(3).max(500),
  ringkasan: z.string().trim().min(3).max(1500),
});

const TOOLS: FunctionTool[] = [
  {
    type: "function",
    name: "kirim_ke_teguh",
    description:
      "Teruskan data calon klien ke Teguh lewat Telegram. Panggil HANYA setelah pengunjung memberi nama dan kontak, lalu menyetujui datanya diteruskan.",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        nama: { type: "string", description: "Nama pengunjung" },
        kontak: { type: "string", description: "Nomor WhatsApp atau email pengunjung" },
        kebutuhan: { type: "string", description: "Kebutuhan utama dalam satu kalimat" },
        ringkasan: {
          type: "string",
          description: "Ringkasan obrolan: fitur, tenggat, budget, dan layanan yang disarankan",
        },
      },
      required: ["nama", "kontak", "kebutuhan", "ringkasan"],
      additionalProperties: false,
    },
  },
];

const FALLBACK_TEXT = `Maaf, asisten sedang bermasalah. Silakan hubungi Teguh langsung lewat WhatsApp: ${WHATSAPP_URL}`;

const isRateLimited = createRateLimiter(10 * 60 * 1000, 30);
const isLeadLimited = createRateLimiter(60 * 60 * 1000, 3);

type ChatMessage = z.infer<typeof MESSAGE_SCHEMA>;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function runTool(
  call: ResponseFunctionToolCall,
  ip: string,
  messages: ChatMessage[]
): Promise<ResponseInputItem.FunctionCallOutput> {
  const reply = (output: object): ResponseInputItem.FunctionCallOutput => ({
    type: "function_call_output",
    call_id: call.call_id,
    output: JSON.stringify(output),
  });

  if (call.name !== "kirim_ke_teguh") {
    return reply({ ok: false, error: "Fungsi tidak dikenal." });
  }

  let lead: z.infer<typeof LEAD_SCHEMA>;
  try {
    lead = LEAD_SCHEMA.parse(JSON.parse(call.arguments));
  } catch {
    return reply({
      ok: false,
      error: "Data belum lengkap. Butuh nama (minimal 2 huruf) dan kontak WhatsApp/email yang valid.",
    });
  }

  if (isLeadLimited(ip)) {
    return reply({
      ok: false,
      error: `Terlalu banyak permintaan dari pengunjung ini. Arahkan ke WhatsApp: ${WHATSAPP_URL}`,
    });
  }

  // Sertakan pesan asli pengunjung, bukan hanya ringkasan dari model.
  const visitorMessages = messages
    .filter((m) => m.role === "user")
    .slice(-6)
    .map((m) => `> ${m.content.slice(0, 300)}`)
    .join("\n");
  const time = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

  const sent = await sendLeadToTelegram(
    [
      "🟢 Calon klien dari chatbot teguhcoding.com",
      `Nama: ${lead.nama}`,
      `Kontak: ${lead.kontak}`,
      `Kebutuhan: ${lead.kebutuhan}`,
      "",
      `Ringkasan: ${lead.ringkasan}`,
      "",
      "Pesan pengunjung:",
      visitorMessages,
      "",
      `Waktu: ${time} WIB`,
    ].join("\n")
  );

  return reply(
    sent
      ? { ok: true }
      : { ok: false, error: `Gagal meneruskan. Arahkan ke WhatsApp: ${WHATSAPP_URL}` }
  );
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_CHAT_API_KEY;
  if (!apiKey) {
    console.error("[api/chat] missing OPENAI_CHAT_API_KEY");
    return jsonError(FALLBACK_TEXT, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Pesan tidak terbaca. Muat ulang halaman lalu coba lagi.", 400);
  }

  const parsed = BODY_SCHEMA.safeParse(body);
  if (!parsed.success) {
    return jsonError("Pesan tidak valid. Muat ulang halaman lalu coba lagi.", 400);
  }

  const { messages } = parsed.data;
  const userMessages = messages.filter((m) => m.role === "user");
  if (messages[messages.length - 1].role !== "user") {
    return jsonError("Pesan tidak valid. Muat ulang halaman lalu coba lagi.", 400);
  }
  if (userMessages.some((m) => m.content.length > MAX_USER_CHARS)) {
    return jsonError(`Pesan terlalu panjang. Maksimal ${MAX_USER_CHARS} karakter.`, 400);
  }
  if (userMessages.length > MAX_USER_MESSAGES) {
    return jsonError(
      `Obrolan ini sudah mencapai batas. Untuk lanjut, hubungi Teguh lewat WhatsApp: ${WHATSAPP_URL}`,
      429
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return jsonError("Terlalu banyak pesan dalam waktu singkat. Coba lagi beberapa menit lagi.", 429);
  }

  const openai = new OpenAI({ apiKey });
  const model = process.env.OPENAI_CHAT_MODEL || "gpt-6-luna";
  const safetyIdentifier = createHash("sha256").update(ip).digest("hex");
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wroteText = false;
      const write = (text: string) => {
        controller.enqueue(encoder.encode(text));
        wroteText = true;
      };

      let input: ResponseInputItem[] = messages.map((m) => ({ role: m.role, content: m.content }));

      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const events = await openai.responses.create(
            {
              model,
              instructions: SYSTEM_PROMPT,
              input,
              tools: TOOLS,
              reasoning: { effort: "low" },
              max_output_tokens: 1200,
              store: false,
              include: ["reasoning.encrypted_content"],
              prompt_cache_key: "teguhcoding-chat",
              safety_identifier: safetyIdentifier,
              stream: true,
            },
            { signal: request.signal }
          );

          let output: ResponseOutputItem[] = [];
          let separated = !wroteText;
          for await (const event of events) {
            if (event.type === "response.output_text.delta") {
              if (!separated) {
                write("\n\n");
                separated = true;
              }
              write(event.delta);
            } else if (event.type === "response.completed" || event.type === "response.incomplete") {
              output = event.response.output;
            } else if (event.type === "response.failed" || event.type === "error") {
              throw new Error(`OpenAI stream ${event.type}`);
            }
          }

          const calls = output.filter(
            (item): item is ResponseFunctionToolCall => item.type === "function_call"
          );
          if (calls.length === 0 || round === MAX_TOOL_ROUNDS) break;

          const results = await Promise.all(calls.map((call) => runTool(call, ip, messages)));
          input = [...input, ...(output as ResponseInputItem[]), ...results];
        }

        if (!wroteText) write(FALLBACK_TEXT);
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("[api/chat] failed", error);
          write(wroteText ? `\n\n${FALLBACK_TEXT}` : FALLBACK_TEXT);
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
