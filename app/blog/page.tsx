import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { BlogPost } from "@/lib/types";

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

export default async function Blog() {
  const posts = await getAllPosts();
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        <div className="grid space-y-8">
          {posts.map((post: BlogPost) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="retro-card p-6">
                {post.mainImage && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).width(800).height(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-4 mb-2">
                  {post.categories && post.categories.length > 0 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                      {post.categories[0].title}
                    </span>
                  )}
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-black dark:text-white font-bold">
                  Read more <ArrowRight size={16} className="ml-2" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
