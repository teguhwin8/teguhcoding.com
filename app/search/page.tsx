import { Metadata } from "next";
import { Search } from "lucide-react";
import { getAllPosts, BlogPost } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q
      ? `Hasil pencarian "${q}" - Teguh Widodo`
      : "Cari Artikel - Teguh Widodo",
    description: "Cari artikel tentang web development, programming, dan teknologi.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";

  let posts: BlogPost[] = [];
  if (query) {
    try {
      const allPosts = await getAllPosts();
      posts = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    } catch {
      posts = [];
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-3">
            Cari Artikel
          </h1>
          {query ? (
            <p className="text-[var(--text-muted)]">
              {posts.length > 0
                ? `${posts.length} hasil untuk "${query}"`
                : `Tidak ada hasil untuk "${query}"`}
            </p>
          ) : (
            <p className="text-[var(--text-muted)]">
              Masukkan kata kunci untuk mencari artikel.
            </p>
          )}
        </div>

        {/* Search form */}
        <form
          method="GET"
          action="/search"
          className="mb-12 max-w-xl mx-auto"
        >
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari artikel..."
              autoFocus
              className="form-input flex-1"
            />
            <button type="submit" className="btn-primary">
              <Search size={15} />
              Cari
            </button>
          </div>
        </form>

        {/* Results */}
        {query && posts.length > 0 && (
          <section aria-label="Hasil pencarian">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} priority={index < 2} />
              ))}
            </div>
          </section>
        )}

        {query && posts.length === 0 && (
          <div className="text-center py-20 clean-card max-w-xl mx-auto">
            <Search size={40} className="mx-auto mb-4 text-[var(--text-subtle)]" />
            <p className="text-sm text-[var(--text-muted)]">
              Tidak ada artikel yang cocok.
            </p>
            <p className="text-xs text-[var(--text-subtle)] mt-1">
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
