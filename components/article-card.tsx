import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/markdown';

export default function ArticleCard({ post, priority = false }: { post: BlogPost, priority?: boolean }) {
  const dateStr = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Ambil paragraf pertama yang tidak kosong dan bersihkan dari format markdown
  const cleanExcerpt = post.excerpt
    .split('\n')
    .filter(line => line.trim().length > 0)[0]
    ?.replace(/^#+\s+/, '')      // Hapus header (#, ##, dll)
    .replace(/[*_`~[\]]/g, '')   // Hapus bold, italic, link brackets, dll
    .trim() || '';

  return (
    <article className="group flex flex-col border-2 border-black dark:border-gray-700 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] bg-white dark:bg-gray-800 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]">

      {/* Cover Image — clickable */}
      {post.cover_image && (
        <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <div className="relative aspect-[16/9] w-full border-b-2 border-black dark:border-gray-700 block overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
        </Link>
      )}

      <div className="p-5 flex flex-col flex-grow">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 leading-tight line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-grow">
          {cleanExcerpt}
        </p>

        {/* Footer (Date and Read more) */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{dateStr}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{post.readingTime} menit baca</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-bold text-black dark:text-white flex items-center gap-1 hover:underline"
          >
            Read <span className="sr-only">about {post.title}</span> →
          </Link>
        </div>
      </div>
    </article>
  );
}
