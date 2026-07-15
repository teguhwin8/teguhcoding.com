import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/markdown";

export default function ArticleCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const dateStr = new Date(post.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const cleanExcerpt =
    post.excerpt
      .split("\n")
      .filter((line) => line.trim().length > 0)[0]
      ?.replace(/^#+\s+/, "")
      .replace(/[*_`~[\]]/g, "")
      .trim() || "";

  return (
    <article className="clean-card group flex flex-col overflow-hidden h-full">
      {/* Cover image */}
      {post.cover_image && (
        <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
        </Link>
      )}

      <div className="p-5 flex flex-col flex-grow">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-base font-semibold text-[var(--text)] mb-2 leading-snug line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-[var(--text-muted)] transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-3 flex-grow leading-relaxed">
          {cleanExcerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--text-subtle)]">{dateStr}</span>
          <span className="text-xs text-[var(--text-subtle)]">
            {post.readingTime} mnt
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-medium text-[var(--text)] hover:text-[var(--text-muted)] transition-colors"
          >
            Baca →
          </Link>
        </div>
      </div>
    </article>
  );
}
