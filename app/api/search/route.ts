import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  try {
    const posts = await searchPosts(query);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Failed to search posts" }, { status: 500 });
  }
}
