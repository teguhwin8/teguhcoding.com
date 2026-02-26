"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Search, X } from "lucide-react";
import { format } from "date-fns";
import { WordPressPost } from "@/lib/types";

interface BlogListProps {
  posts: WordPressPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const title = post.title.rendered.toLowerCase();
    const excerpt = post.excerpt.rendered.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || excerpt.includes(query);
  });

  return (
    <div>
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Cari artikel..."
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {filteredPosts.length > 0 ? (
        <section aria-label="Daftar artikel blog">
          <div className="grid space-y-8">
            {filteredPosts.map((post: WordPressPost) => {
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
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tidak ada artikel yang cocok dengan pencarian "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
