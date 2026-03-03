import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
const rateStore = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = rateStore.get(ip) ?? [];
  const recentAttempts = attempts.filter((time) => now - time < RATE_WINDOW_MS);

  if (recentAttempts.length >= RATE_LIMIT) {
    rateStore.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  rateStore.set(ip, recentAttempts);
  return false;
}

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
    const response = NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const parsed = CONTACT_SCHEMA.safeParse(body);
  if (!parsed.success) {
    console.warn(`[api/contact] requestId=${requestId} status=400 durationMs=${Date.now() - startedAt} reason=invalid-input`);
    const response = NextResponse.json({ error: "Invalid form input" }, { status: 400 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    console.warn(`[api/contact] requestId=${requestId} status=429 durationMs=${Date.now() - startedAt} reason=rate-limited`);
    const response = NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 });
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
    const response = NextResponse.json({ error: "Form submitted too quickly" }, { status: 400 });
    response.headers.set("x-request-id", requestId);
    return response;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    console.error(`[api/contact] requestId=${requestId} status=500 durationMs=${Date.now() - startedAt} reason=missing-config`);
    const response = NextResponse.json(
      { error: "Contact email service is not configured" },
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
      { error: "Failed to send message, please try again later" },
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
