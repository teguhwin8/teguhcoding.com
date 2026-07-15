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
  initialVisibleCount = 12,
}: TagFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleTags = showAll ? allTags : allTags.slice(0, initialVisibleCount);
  const hiddenCount = allTags.length - initialVisibleCount;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      <Link href="/blog" className={`tag-pill${!currentTag ? " active" : ""}`}>
        Semua
      </Link>

      {visibleTags.map((t) => (
        <Link
          key={t}
          href={`/blog?tag=${encodeURIComponent(t)}`}
          className={`tag-pill${currentTag === t ? " active" : ""}`}
        >
          {t}
        </Link>
      ))}

      {!showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="tag-pill"
        >
          +{hiddenCount} lainnya
        </button>
      )}

      {showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(false)}
          className="tag-pill"
        >
          Sembunyikan
        </button>
      )}
    </div>
  );
}
