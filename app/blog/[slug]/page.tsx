import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/wordpress";
import { format } from "date-fns";
import { extractHeadingsAndAddIds } from "@/lib/toc";
import { TableOfContents } from "@/components/table-of-contents";

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

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const excerptText = post.excerpt.rendered.replace(/<[^>]*>?/gm, "").trim();

  return {
    title: `${post.title.rendered} - Teguh Widodo`,
    description: excerptText,
    openGraph: {
      title: post.title.rendered,
      description: excerptText,
      type: "article",
      publishedTime: post.date,
      images: featuredImage ? [featuredImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: excerptText,
      images: featuredImage ? [featuredImage] : [],
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

// Revalidate every 60 seconds
export const revalidate = 60;

// Force static generation
export const dynamic = "force-static";


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const author = post._embedded?.author?.[0];

  // Process content for Table of Contents
  const { content: processedContent, headings } = extractHeadingsAndAddIds(post.content.rendered);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (Left) */}
            <div className="lg:col-span-8">
              {/* Hero image */}
              {featuredImage && (
                <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden shadow-lg border-4 border-black dark:border-white">
                  <Image
                    src={featuredImage}
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Post header */}
              <header className="mb-10">
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                      <span
                        key={category.id}
                        className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold"
                        dangerouslySetInnerHTML={{ __html: category.name }}
                      />
                    ))}
                  </div>
                )}

                <h1
                  className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {format(new Date(post.date), "MMMM dd, yyyy")}
                  </div>
                  {author && (
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      {author.name}
                    </div>
                  )}
                </div>
              </header>

              {/* Mobile Table of Contents - visible only on small screens */}
              <div className="lg:hidden mb-12">
                <TableOfContents headings={headings} />
              </div>

              {/* Post content */}
              <article
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Author bio */}
              {author && author.description && (
                <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    About the Author
                  </h3>
                  <div className="flex items-start space-x-6">
                    {author.avatar_urls && (
                      <Image
                        src={author.avatar_urls["96"]}
                        alt={author.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-black dark:border-white"
                      />
                    )}
                    <div>
                      <p className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {author.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {author.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (Right) - Desktop only */}
            <aside className="hidden lg:block lg:col-span-4">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}


