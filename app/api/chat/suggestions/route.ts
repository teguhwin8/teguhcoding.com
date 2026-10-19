import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

const BODY_SCHEMA = z.object({
  assistantMessage: z.string().trim().min(1).max(4000),
  previousSuggestions: z.array(z.string().trim().max(60)).max(4).optional(),
});

const isRateLimited = createRateLimiter(10 * 60 * 1000, 40);

const SUGGESTIONS_FORMAT = {
  type: "json_schema" as const,
  name: "chat_suggestions",
  strict: true,
  schema: {
    type: "object",
    properties: {
      suggestions: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["suggestions"],
    additionalProperties: false,
  },
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_CHAT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ suggestions: [] }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak terbaca." }, { status: 400 });
  }

  const parsed = BODY_SCHEMA.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Pesan tidak valid." }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ suggestions: [] }, { status: 429 });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.responses.create(
      {
        model: process.env.OPENAI_CHAT_MODEL || "gpt-6-luna",
        instructions: [
          "Buat tombol balasan singkat untuk pengunjung situs jasa web developer. Samakan bahasa dan gaya dengan pesan asisten terbaru; gunakan Bahasa Indonesia santai dan sopan jika pesannya berbahasa Indonesia.",
          "Gunakan hanya pesan terbaru asisten sebagai konteks; jangan meminta nama, nomor telepon, atau email secara langsung.",
          "Buat 2 sampai 4 opsi alami, pendek, dan benar-benar relevan dengan pertanyaan asisten.",
          "Jika asisten meminta izin meneruskan data, sediakan pilihan setuju dan menolak dengan jelas.",
          "Jangan mengulang opsi yang sudah ada. Jangan menambahkan janji, harga, atau fakta baru.",
          "Jika asisten meminta detail tertentu, opsi boleh menawarkan cara menjawab tanpa mengarang detail pribadi.",
        ].join(" "),
        input: JSON.stringify({
          pesanTerbaruAsisten: parsed.data.assistantMessage,
          opsiSebelumnya: parsed.data.previousSuggestions ?? [],
        }),
        text: { format: SUGGESTIONS_FORMAT },
        max_output_tokens: 180,
        store: false,
        safety_identifier: createHash("sha256").update(ip).digest("hex"),
        prompt_cache_key: "teguhcoding-chat-suggestions",
      },
      { signal: request.signal }
    );

    const output = JSON.parse(response.output_text) as { suggestions?: unknown };
    const suggestions = z
      .array(z.string().trim().min(1).max(60))
      .max(4)
      .safeParse(output.suggestions);

    return NextResponse.json({ suggestions: suggestions.success ? suggestions.data : [] });
  } catch (error) {
    console.error("[api/chat/suggestions] failed", error);
    return NextResponse.json({ suggestions: [] }, { status: 502 });
  }
}
