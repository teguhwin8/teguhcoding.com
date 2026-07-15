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
    title: currentTag
      ? `Topik: ${currentTag} - Blog`
      : "Developer Feed - Teguh Widodo",
    description:
      "Kumpulan artikel, tutorial, dan berita teknologi terbaru hasil kurasi.",
    openGraph: {
      title: currentTag
        ? `Topik: ${currentTag} - Blog`
        : "Developer Feed - Teguh Widodo",
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
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  ).sort();

  if (currentTag) {
    posts = posts.filter(
      (p) => p.tags && p.tags.includes(currentTag)
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Writing
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Developer Feed
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Kumpulan artikel dan wawasan seputar web development, AI, dan
            teknologi.
          </p>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <TagFilter allTags={allTags} currentTag={currentTag} />
        )}

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <ArticleCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 clean-card">
            <p className="text-[var(--text-muted)] text-sm">
              Belum ada artikel di topik ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
