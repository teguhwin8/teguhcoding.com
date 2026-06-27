import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/markdown";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Teguh Widodo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover_image ? [post.cover_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamic = "force-static";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateStr = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Feed
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
          {/* Hero image */}
          {post.cover_image && (
            <div className="relative h-[300px] sm:h-[400px] w-full border-b-2 border-black dark:border-gray-700">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <header className="mb-8">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-bold border border-gray-200 dark:border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium">
                <Calendar size={18} className="mr-2" />
                {dateStr}
              </div>
            </header>

            {/* Post Excerpt Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-10 text-gray-700 dark:text-gray-300">
              {post.excerpt.split('\\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action Area */}
            <div className="pt-8 border-t-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
              <a
                href={post.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-black text-white dark:bg-white dark:text-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all border-2 border-transparent dark:border-black"
              >
                Baca Artikel Selengkapnya
                <ExternalLink size={20} className="ml-2" />
              </a>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Anda akan diarahkan ke sumber asli artikel ini.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
