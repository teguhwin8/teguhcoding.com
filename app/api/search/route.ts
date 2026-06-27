import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/markdown";

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  if (!query.trim()) {
    const response = NextResponse.json([]);
    response.headers.set("x-request-id", requestId);
    console.info(`[api/search] requestId=${requestId} status=200 durationMs=${Date.now() - startedAt} emptyQuery=true`);
    return response;
  }

  try {
    const allPosts = await getAllPosts();
    
    const posts = allPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
    
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
