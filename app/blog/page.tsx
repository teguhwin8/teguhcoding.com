import { Metadata } from "next";
import { Search } from "lucide-react";
import { getAllPosts, searchPosts } from "@/lib/wordpress";
import BlogList from "@/components/blog-list";

interface BlogPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();

  return {
    title: query ? `Hasil pencarian "${query}" - Blog` : "Blog - Teguh Widodo",
    description:
      "Read my latest articles about web development, programming, and technology insights.",
    openGraph: {
      title: query ? `Hasil pencarian "${query}" - Blog` : "Blog - Teguh Widodo",
      description:
        "Read my latest articles about web development, programming, and technology insights.",
      type: "website",
    },
  };
}

// Revalidate every 60 seconds
export const revalidate = 60;

// Ensure query-based search is rendered on server per request.
export const dynamic = "force-dynamic";

export default async function Blog({ searchParams }: BlogPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const posts = query ? await searchPosts(query) : await getAllPosts();

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        {query ? (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {posts.length > 0
              ? `Ditemukan ${posts.length} artikel untuk "${query}"`
              : `Tidak ada artikel yang ditemukan untuk "${query}"`}
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Artikel tentang web development, programming, dan teknologi terbaru.
          </p>
        )}

        <form method="GET" action="/blog" className="mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari artikel..."
              className="flex-1 px-4 py-3 border-2 border-black dark:border-gray-300 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <button
              type="submit"
              className="retro-button px-6 py-3 flex items-center gap-2 font-bold"
            >
              <Search size={18} />
              Cari
            </button>
          </div>
        </form>

        <BlogList posts={posts} />

        {query && posts.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl text-gray-500 dark:text-gray-400">
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
