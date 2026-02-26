import { Metadata } from "next";
import { getAllPosts } from "@/lib/wordpress";
import BlogList from "@/components/blog-list";

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
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Artikel tentang web development, programming, dan teknologi terbaru.
        </p>
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
