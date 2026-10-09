import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

const CONTACT_SCHEMA = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional(),
  formStartedAt: z.number().int().positive(),
});

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const MIN_FILL_MS = 3000;
const isRateLimited = createRateLimiter(RATE_WINDOW_MS, RATE_LIMIT);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    console.warn(`[api/contact] requestId=${requestId} status=400 durationMs=${Date.now() - startedAt} reason=invalid-json`);
    const response = NextResponse.json({ error: "Data form tidak terbaca. Muat ulang halaman lalu coba lagi." }, { status: 400 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const parsed = CONTACT_SCHEMA.safeParse(body);
  if (!parsed.success) {
    console.warn(`[api/contact] requestId=${requestId} status=400 durationMs=${Date.now() - startedAt} reason=invalid-input`);
    const response = NextResponse.json({ error: "Cek lagi isian form: nama minimal 2 huruf, perihal minimal 3 huruf, pesan minimal 10 huruf, dan email harus valid." }, { status: 400 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    console.warn(`[api/contact] requestId=${requestId} status=429 durationMs=${Date.now() - startedAt} reason=rate-limited`);
    const response = NextResponse.json({ error: "Terlalu banyak pesan dalam waktu singkat. Coba lagi 15 menit lagi." }, { status: 429 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const { name, email, subject, message, website, formStartedAt } = parsed.data;

  if (website && website.trim() !== "") {
    console.info(`[api/contact] requestId=${requestId} status=200 durationMs=${Date.now() - startedAt} honeypot=true`);
    const response = NextResponse.json({ ok: true });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  if (Date.now() - formStartedAt < MIN_FILL_MS) {
    console.warn(`[api/contact] requestId=${requestId} status=400 durationMs=${Date.now() - startedAt} reason=too-fast`);
    const response = NextResponse.json({ error: "Form terkirim terlalu cepat. Tunggu beberapa detik lalu kirim lagi." }, { status: 400 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    console.error(`[api/contact] requestId=${requestId} status=500 durationMs=${Date.now() - startedAt} reason=missing-config`);
    const response = NextResponse.json(
      { error: "Form sedang bermasalah. Untuk sementara, hubungi saya lewat WhatsApp atau email." },
      { status: 500 }
    );
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `[Contact] ${subject}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      `,
    }),
  });

  if (!response.ok) {
    const providerBody = await response.text().catch(() => "");
    console.error(
      `[api/contact] requestId=${requestId} status=502 durationMs=${Date.now() - startedAt} resendStatus=${response.status} resendBody=${providerBody.slice(0, 500)}`
    );
    const errorResponse = NextResponse.json(
      { error: "Pesan gagal terkirim. Coba lagi nanti, atau hubungi saya lewat WhatsApp." },
      { status: 502 }
    );
    errorResponse.headers.set("x-request-id", requestId);
    return errorResponse;
  }

  console.info(`[api/contact] requestId=${requestId} status=200 durationMs=${Date.now() - startedAt} sent=true`);
  const successResponse = NextResponse.json({ ok: true });
  successResponse.headers.set("x-request-id", requestId);
  return successResponse;
}
