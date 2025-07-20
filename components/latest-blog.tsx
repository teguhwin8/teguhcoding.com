"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Future of Frontend Development",
    excerpt:
      "Exploring upcoming trends and technologies in frontend development",
    date: "2024-02-28",
    link: "/blog/future-of-frontend",
  },
  {
    id: 2,
    title: "Mastering React Performance",
    excerpt: "Tips and tricks for optimizing React applications",
    date: "2024-02-25",
    link: "/blog/react-performance",
  },
  {
    id: 3,
    title: "Building with Next.js 14",
    excerpt: "A deep dive into the latest features of Next.js",
    date: "2024-02-20",
    link: "/blog/nextjs-14",
  },
];

export function LatestBlog() {
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
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={post.link}>
                <div className="retro-card p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {post.date}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-black dark:text-white font-bold">
                    Read more <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
