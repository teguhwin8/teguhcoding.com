"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogPost, Category } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";

interface LatestBlogProps {
  posts: BlogPost[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Blog Posts
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug.current}`}>
                <div className="retro-card overflow-hidden">
                  {post.mainImage && (
                    <div className="relative h-48">
                      <Image
                        src={urlFor(post.mainImage)
                          .width(400)
                          .height(200)
                          .url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar size={14} className="mr-1" />
                      {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                    </div>
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.map((category: Category) => (
                          <span
                            key={`${category._id}+${category.title}`}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-black dark:text-white font-bold">
                      Read more <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No blog posts available yet.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="retro-button px-6 py-3 inline-flex items-center space-x-2"
            >
              <span>View All Posts</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
