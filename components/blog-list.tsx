import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { WordPressPost } from "@/lib/types";
import { htmlToPlainText } from "@/lib/html-text";

interface BlogListProps {
  posts: WordPressPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section aria-label="Daftar artikel blog">
      <div className="grid space-y-8">
        {posts.map((post: WordPressPost, index) => {
          const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const category = post._embedded?.["wp:term"]?.[0]?.[0];
          const categoryName = category ? htmlToPlainText(category.name) : "";
          const titleText = htmlToPlainText(post.title.rendered);
          const excerptText = htmlToPlainText(post.excerpt.rendered);

          return (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="retro-card p-6">
                {featuredImage && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={featuredImage}
                      alt={titleText}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-4 mb-2">
                  {category && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                      {categoryName}
                    </span>
                  )}
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {format(new Date(post.date), "MMM dd, yyyy")}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{titleText}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{excerptText}</p>
                <div className="flex items-center text-black dark:text-white font-bold">
                  Read more <ArrowRight size={16} className="ml-2" />
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
