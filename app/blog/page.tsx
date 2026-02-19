import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/wordpress";
import { format } from "date-fns";
import { WordPressPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog - Teguh Widodo",
  description:
    "Read my latest articles about web development, programming, and technology insights.",
  openGraph: {
    title: "Blog - Teguh Widodo",
    description:
      "Read my latest articles about web development, programming, and technology insights.",
    type: "website",
  },
};

// Revalidate every 60 seconds
export const revalidate = 60;

// Force static generation
export const dynamic = "force-static";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12">Artikel tentang web development, programming, dan teknologi terbaru.</p>
        <section aria-label="Daftar artikel blog">
          <div className="grid space-y-8">
            {posts.map((post: WordPressPost) => {
              const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const category = post._embedded?.["wp:term"]?.[0]?.[0];

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
                        <span
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          dangerouslySetInnerHTML={{ __html: category.name }}
                        />
                      )}
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {format(new Date(post.date), "MMM dd, yyyy")}
                      </div>
                    </div>
                    <h2
                      className="text-2xl font-bold mb-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div
                      className="text-gray-600 dark:text-gray-300 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="flex items-center text-black dark:text-white font-bold">
                      Read more <ArrowRight size={16} className="ml-2" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

