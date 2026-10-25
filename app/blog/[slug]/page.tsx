import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/markdown";
import ArticleCard from "@/components/article-card";
import TableOfContents from "@/components/table-of-contents";
import { JsonLd } from "@/components/json-ld";
import AiAutomationCta from "@/components/ai-automation-cta";
import {
  DEFAULT_OG_IMAGE,
  PERSON,
  SITE_URL,
  absoluteUrl,
  extractFaq,
  pageMetadata,
  sourceHost,
  toDescription,
} from "@/lib/seo";

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

  const description = toDescription(post.excerpt);

  return pageMetadata({
    title: post.title,
    description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    image: post.cover_image || undefined,
  });
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

  const postUrl = absoluteUrl(`/blog/${slug}`);
  const sourceDomain = sourceHost(post.source_url);
  const faq = extractFaq(post.excerpt);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: toDescription(post.excerpt),
        image: absoluteUrl(post.cover_image || DEFAULT_OG_IMAGE),
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: "id-ID",
        keywords: post.tags?.join(", "),
        mainEntityOfPage: postUrl,
        ...(sourceDomain ? { isBasedOn: post.source_url } : {}),
        url: postUrl,
        author: { "@id": PERSON["@id"], "@type": "Person", name: PERSON.name, url: SITE_URL },
        publisher: { "@id": PERSON["@id"], "@type": "Person", name: PERSON.name, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
      ...(faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };
  const updatedStr = post.updated
    ? new Date(post.updated).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

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

  const hasToc = /^#{2,3}\s+.+$/m.test(post.excerpt);

  const showAiCta = Boolean(
    post.tags &&
      post.tags.some((tag) => {
        const t = tag.toLowerCase();
        return (
          t.includes("ai") ||
          t.includes("agent") ||
          t.includes("tool") ||
          t.includes("otomasi") ||
          t.includes("docker") ||
          t.includes("vps") ||
          t.includes("bot") ||
          t.includes("server")
        );
      })
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div
        className={
          hasToc
            ? "max-w-3xl mx-auto xl:max-w-none xl:grid xl:grid-cols-[minmax(0,48rem)_15rem] xl:justify-center xl:gap-12"
            : "max-w-3xl mx-auto"
        }
      >
        <div className="min-w-0">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Kembali ke Feed
          </Link>

          <article>
            <JsonLd data={articleJsonLd} />
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
                  <time dateTime={post.date}>{dateStr}</time>
                </span>
                {updatedStr && updatedStr !== dateStr && (
                  <span>
                    Diperbarui <time dateTime={post.updated}>{updatedStr}</time>
                  </span>
                )}
                <span>{post.readingTime} menit baca</span>
              </div>
              {sourceDomain && (
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  Sumber utama:{" "}
                  <a
                    href={finalSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[var(--text)]"
                  >
                    {sourceDomain}
                  </a>
                  . Ditulis ulang dan dikurasi oleh Teguh Widodo.
                </p>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-gray max-w-none mb-10">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
              >
                {post.excerpt}
              </ReactMarkdown>
            </div>

            {/* AI Automation Affiliate CTA */}
            {showAiCta && <AiAutomationCta />}

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

        {/* Table of Contents */}
        <TableOfContents content={post.excerpt} />
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
