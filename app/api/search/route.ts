import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (!query.trim()) {
    const response = NextResponse.json([]);
    response.headers.set("x-request-id", requestId);
    console.info(`[api/search] requestId=${requestId} status=200 durationMs=${Date.now() - startedAt} emptyQuery=true`);
    return response;
  }

  try {
    const posts = await searchPosts(query);
    const response = NextResponse.json(posts);
    response.headers.set("x-request-id", requestId);
    console.info(
      `[api/search] requestId=${requestId} status=200 durationMs=${Date.now() - startedAt} queryLength=${query.trim().length} results=${posts.length}`
    );
    return response;
  } catch (error) {
    console.error(
      `[api/search] requestId=${requestId} status=500 durationMs=${Date.now() - startedAt} queryLength=${query.trim().length}`,
      error
    );
    const response = NextResponse.json({ error: "Failed to search posts" }, { status: 500 });
    response.headers.set("x-request-id", requestId);
    return response;
  }
}
