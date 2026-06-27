import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/markdown';

export default function ArticleCard({ post, priority = false }: { post: BlogPost, priority?: boolean }) {
  // Format date nicely
  const dateStr = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col border-2 border-black dark:border-gray-700 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] bg-white dark:bg-gray-800 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]">
      
      {/* Cover Image */}
      {post.cover_image && (
        <Link href={`/blog/${post.slug}`} className="relative h-48 w-full border-b-2 border-black dark:border-gray-700 block overflow-hidden">
          <Image 
            src={post.cover_image} 
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </Link>
      )}

      <div className="p-5 flex flex-col flex-grow">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-200 dark:border-gray-600">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-grow">
          {post.excerpt.split('\\n')[0]} {/* Just show first paragraph in card */}
        </p>

        {/* Footer (Date and Read more) */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{dateStr}</span>
          <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-black dark:text-white flex items-center gap-1 hover:underline">
            Read <span className="sr-only">about {post.title}</span> &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
