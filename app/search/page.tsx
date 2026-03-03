import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { searchPosts } from "@/lib/wordpress";
import { format } from "date-fns";
import { WordPressPost } from "@/lib/types";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
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
  const query = q?.trim() ?? "";

  let posts: WordPressPost[] = [];
  if (query) {
    try {
      posts = await searchPosts(query);
    } catch {
      posts = [];
    }
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Search size={28} />
          <h1 className="text-4xl font-bold">Cari Artikel</h1>
        </div>

        {query ? (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {posts.length > 0
              ? `Ditemukan ${posts.length} artikel untuk "${query}"`
              : `Tidak ada artikel yang ditemukan untuk "${query}"`}
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Masukkan kata kunci untuk mencari artikel.
          </p>
        )}

        {/* Search form */}
        <form method="GET" action="/search" className="mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari artikel..."
              autoFocus
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

        {/* Results */}
        {query && posts.length > 0 && (
          <section aria-label="Hasil pencarian">
            <div className="grid space-y-8">
              {posts.map((post: WordPressPost) => {
                const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const category = post._embedded?.["wp:term"]?.[0]?.[0];
                const titleText = stripHtml(post.title.rendered);
                const excerptText = stripHtml(post.excerpt.rendered);
                const categoryName = category ? stripHtml(category.name) : "";

                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="retro-card p-6">
                      {featuredImage && (
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={featuredImage}
                            alt={post.title.rendered}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center space-x-4 mb-2">
                        {category && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                            {categoryName}
                          </span>
                        )}
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                          <Calendar size={14} className="mr-1" />
                          {format(new Date(post.date), "MMM dd, yyyy")}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{titleText}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{excerptText}</p>
                      <div className="flex items-center text-black dark:text-white font-bold">
                        Read more <ArrowRight size={16} className="ml-2" />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

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
