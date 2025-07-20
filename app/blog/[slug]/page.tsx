import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPost, getAllPostSlugs } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { Category } from "@/lib/types";
import { portableTextComponents } from "@/lib/portable-text-components";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

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
      publishedTime: post.publishedAt,
      images: post.mainImage
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.mainImage
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Revalidate every 60 seconds
export const revalidate = 60;

// Force static generation
export const dynamic = "force-static";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          {/* Hero image */}
          {post.mainImage && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={urlFor(post.mainImage).width(1200).height(400).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post header */}
          <header className="mb-8">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: Category) => (
                  <span
                    key={`${category._id}+${category.title}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              </div>
              {post.author && (
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {post.author.name}
                </div>
              )}
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Post content */}
          <article className="prose prose-lg max-w-none">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </article>

          {/* Author bio */}
          {post.author && post.author.bio && (
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                About the Author
              </h3>
              <div className="flex items-start space-x-4">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </p>
                  <div className="text-gray-600 dark:text-gray-300">
                    <PortableText value={post.author.bio} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
