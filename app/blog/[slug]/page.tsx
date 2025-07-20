import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPost } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { Category } from "@/lib/types";

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

// Revalidate every 60 seconds
export const revalidate = 60;

// Portable Text components for rich text rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(400).url()}
          alt={value.alt || "Blog image"}
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
        {value.caption && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-6 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

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
