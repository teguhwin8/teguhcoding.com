import { Metadata } from "next";
import { Search } from "lucide-react";
import { getAllPosts, BlogPost } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Hasil pencarian "${q}" - Teguh Widodo` : "Cari Artikel - Teguh Widodo",
    description: "Cari artikel tentang web development, programming, dan teknologi.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";

  let posts: BlogPost[] = [];
  if (query) {
    try {
      const allPosts = await getAllPosts();
      posts = allPosts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    } catch {
      posts = [];
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2 justify-center">
          <Search size={32} />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Cari Artikel</h1>
        </div>

        {query ? (
          <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {posts.length > 0
              ? `Ditemukan ${posts.length} artikel untuk "${query}"`
              : `Tidak ada artikel yang ditemukan untuk "${query}"`}
          </p>
        ) : (
          <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Masukkan kata kunci untuk mencari artikel dari repositori Markdown.
          </p>
        )}

        {/* Search form */}
        <form method="GET" action="/search" className="mb-12 max-w-2xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari artikel..."
              autoFocus
              className="flex-1 px-4 py-3 border-2 border-black dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl flex items-center gap-2 border-2 border-transparent transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            >
              <Search size={18} />
              Cari
            </button>
          </div>
        </form>

        {/* Results */}
        {query && posts.length > 0 && (
          <section aria-label="Hasil pencarian">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} priority={index < 2} />
              ))}
            </div>
          </section>
        )}

        {query && posts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 max-w-2xl mx-auto">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
