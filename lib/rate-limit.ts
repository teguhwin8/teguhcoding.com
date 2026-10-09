import type { NextRequest } from "next/server";

export function getClientIp(request: NextRequest): string {
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

// Pembatas in-memory, per instance server. Di Vercel tiap instance punya hitungan
// sendiri, jadi ini pengaman "best effort", bukan batas mutlak.
export function createRateLimiter(windowMs: number, limit: number) {
  const store = new Map<string, number[]>();

  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    const recentAttempts = (store.get(key) ?? []).filter((time) => now - time < windowMs);

    if (recentAttempts.length >= limit) {
      store.set(key, recentAttempts);
      return true;
    }

    recentAttempts.push(now);
    store.set(key, recentAttempts);

    if (store.size > 5000) {
      for (const [storedKey, times] of store) {
        if (times.every((time) => now - time >= windowMs)) store.delete(storedKey);
      }
    }
    return false;
  };
}
