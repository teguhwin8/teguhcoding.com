import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
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

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamic = "force-static";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateStr = new Date(post.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter(
      (p) =>
        p.tags && post.tags && p.tags.some((tag) => post.tags!.includes(tag))
    )
    .slice(0, 3);

  let finalSourceUrl = post.source_url;
  try {
    const urlObj = new URL(post.source_url);
    urlObj.searchParams.set("ref", "teguhcoding.com");
    finalSourceUrl = urlObj.toString();
  } catch {
    finalSourceUrl = post.source_url.includes("?")
      ? `${post.source_url}&ref=teguhcoding.com`
      : `${post.source_url}?ref=teguhcoding.com`;
  }

  const isVideo =
    post.source_url.includes("youtube.com") ||
    post.source_url.includes("youtu.be");

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Kembali ke Feed
        </Link>

        <article>
          {/* Cover image */}
          {post.cover_image && (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[var(--border)] mb-8">
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

          {/* Header */}
          <header className="mb-8">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="tag-pill"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text)] tracking-tight leading-tight mb-5">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {dateStr}
              </span>
              <span>{post.readingTime} menit baca</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray max-w-none mb-10">
            <ReactMarkdown>{post.excerpt}</ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="pt-8 border-t border-[var(--border)] text-center">
            <a
              href={finalSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              {isVideo ? "Tonton Video Sumber" : "Baca Artikel Selengkapnya"}
              <ExternalLink size={15} />
            </a>
            <p className="mt-3 text-xs text-[var(--text-subtle)]">
              {isVideo
                ? "Anda akan diarahkan ke video asli di YouTube."
                : "Anda akan diarahkan ke sumber asli artikel ini."}
            </p>
          </div>
        </article>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-16 border-t border-[var(--border)]">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-8">
            Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
