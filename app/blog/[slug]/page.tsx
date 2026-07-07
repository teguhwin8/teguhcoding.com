import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";

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

  // Get related posts based on tags
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.tags && post.tags && p.tags.some((tag) => post.tags!.includes(tag)))
    .slice(0, 3);

  // Add ref parameter to source URL
  let finalSourceUrl = post.source_url;
  try {
    const urlObj = new URL(post.source_url);
    urlObj.searchParams.set("ref", "teguhcoding.com");
    finalSourceUrl = urlObj.toString();
  } catch (e) {
    // Fallback if URL is somehow invalid
    finalSourceUrl = post.source_url.includes('?') 
      ? `${post.source_url}&ref=teguhcoding.com`
      : `${post.source_url}?ref=teguhcoding.com`;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 md:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium mb-6 md:mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Feed
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          {/* Hero image */}
          {post.cover_image && (
            <div className="relative aspect-[16/9] w-full">
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

          <div className="p-6 md:p-12">
            <header className="mb-8">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-bold border border-gray-200 dark:border-gray-600 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 font-medium">
                <span className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  {dateStr}
                </span>
                <span>{post.readingTime} menit baca</span>
              </div>
            </header>

            {/* Post Excerpt Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-10 text-gray-700 dark:text-gray-300">
              <ReactMarkdown>{post.excerpt}</ReactMarkdown>
            </div>

            {/* Action Area */}
            <div className="pt-8 border-t-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
              <a
                href={finalSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button inline-flex items-center justify-center px-8 py-4 text-lg"
              >
                {post.source_url.includes('youtube.com') || post.source_url.includes('youtu.be') 
                  ? 'Tonton Video Sumber' 
                  : 'Baca Artikel Selengkapnya'}
                <ExternalLink size={20} className="ml-2" />
              </a>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {post.source_url.includes('youtube.com') || post.source_url.includes('youtu.be')
                  ? 'Anda akan diarahkan ke video asli di YouTube.'
                  : 'Anda akan diarahkan ke sumber asli artikel ini.'}
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* Related Posts Section - Wider Container */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 mt-16">
          <h2 className="text-2xl font-black mb-8 text-gray-900 dark:text-white text-center md:text-left">
            Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
