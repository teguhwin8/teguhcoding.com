"use client";

import { useState } from "react";
import Link from "next/link";

interface TagFilterProps {
  allTags: string[];
  currentTag?: string;
  initialVisibleCount?: number;
}

export default function TagFilter({
  allTags,
  currentTag,
  initialVisibleCount = 10,
}: TagFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleTags = showAll ? allTags : allTags.slice(0, initialVisibleCount);
  const hiddenCount = allTags.length - initialVisibleCount;

  const tagClass = (active: boolean) =>
    `px-4 py-2 rounded-full font-bold text-sm transition-all border-2 border-black dark:border-white ${
      active
        ? "bg-black text-white dark:bg-white dark:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-y-[-2px]"
        : "bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {/* "Semua" button */}
      <Link href="/blog" className={tagClass(!currentTag)}>
        Semua
      </Link>

      {/* Visible tags */}
      {visibleTags.map((t) => (
        <Link
          key={t}
          href={`/blog?tag=${encodeURIComponent(t)}`}
          className={tagClass(currentTag === t)}
        >
          {t}
        </Link>
      ))}

      {/* Show more / Show less toggle */}
      {!showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="px-4 py-2 rounded-full font-bold text-sm transition-all border-2 border-dashed border-black dark:border-white bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          +{hiddenCount} lainnya
        </button>
      )}

      {showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(false)}
          className="px-4 py-2 rounded-full font-bold text-sm transition-all border-2 border-dashed border-black dark:border-white bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Sembunyikan
        </button>
      )}
    </div>
  );
}
