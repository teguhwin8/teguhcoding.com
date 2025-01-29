import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Future of Frontend Development",
    excerpt:
      "Exploring upcoming trends and technologies in frontend development. From WebAssembly to Edge Computing, discover what's next in the world of web development.",
    date: "2024-02-28",
    readTime: "5 min read",
    category: "Technology",
    link: "/blog/future-of-frontend",
  },
  {
    id: 2,
    title: "Mastering React Performance",
    excerpt:
      "Tips and tricks for optimizing React applications. Learn about memo, useMemo, useCallback, and other performance optimization techniques.",
    date: "2024-02-25",
    readTime: "8 min read",
    category: "React",
    link: "/blog/react-performance",
  },
  {
    id: 3,
    title: "Building with Next.js 14",
    excerpt:
      "A deep dive into the latest features of Next.js. Explore server components, streaming, and the new app router.",
    date: "2024-02-20",
    readTime: "10 min read",
    category: "Next.js",
    link: "/blog/nextjs-14",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        <div className="grid space-y-8">
          {posts.map((post) => (
            <Link key={post.id} href={post.link}>
              <article className="retro-card p-6">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-black font-bold">
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
