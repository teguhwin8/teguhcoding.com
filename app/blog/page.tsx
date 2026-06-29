import { Metadata } from "next";
import { getAllPosts } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";
import TagFilter from "@/components/tag-filter";

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { tag } = await searchParams;
  const currentTag = tag?.trim();

  return {
    title: currentTag ? `Topik: ${currentTag} - Blog` : "Developer Feed - Teguh Widodo",
    description:
      "Kumpulan artikel, tutorial, dan berita teknologi terbaru hasil kurasi.",
    openGraph: {
      title: currentTag ? `Topik: ${currentTag} - Blog` : "Developer Feed - Teguh Widodo",
      description:
        "Kumpulan artikel, tutorial, dan berita teknologi terbaru hasil kurasi.",
      type: "website",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function Blog({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const currentTag = tag?.trim();
  
  let posts = await getAllPosts();
  
  // Get all unique tags for the filter buttons
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort();

  // Filter posts if a tag is selected
  if (currentTag) {
    posts = posts.filter(p => p.tags && p.tags.includes(currentTag));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Developer Feed</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kumpulan artikel dan wawasan terbaru seputar web development, AI, dan teknologi.
          </p>
        </header>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <TagFilter allTags={allTags} currentTag={currentTag} />
        )}

        {/* Masonry/Grid Layout */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <ArticleCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              Belum ada artikel di topik ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
