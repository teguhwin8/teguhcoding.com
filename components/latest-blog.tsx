"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";

interface LatestBlogProps {
  posts: BlogPost[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  return (
    <section className="py-20 px-6 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
              Writing
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text)] tracking-tight">
              Latest Articles
            </h2>
          </div>
          {posts.length > 0 && (
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              All articles
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <ArticleCard post={post} priority={index === 0} />
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/blog" className="btn-secondary text-sm">
                Semua artikel
                <ArrowRight size={14} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-[var(--text-muted)] text-sm">
            Belum ada artikel.
          </div>
        )}
      </div>
    </section>
  );
}
