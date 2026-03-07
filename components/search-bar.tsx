"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { WordPressPost } from "@/lib/types";
import { htmlToPlainText } from "@/lib/html-text";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Open on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: WordPressPost[] = await res.json();
      setResults(Array.isArray(data) ? data.slice(0, 6) : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(val), 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        router.push(`/blog/${results[activeIndex].slug}`);
        closeSearch();
      } else if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        closeSearch();
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      closeSearch();
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-gray-300 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:border-gray-600 dark:hover:border-white transition-colors bg-white dark:bg-gray-800"
        aria-label="Cari artikel (Ctrl+K)"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Cari...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
          ⌘K
        </kbd>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
          <div
            ref={containerRef}
            className="w-full max-w-xl bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-300 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] overflow-hidden"
          >
            {/* Search input */}
            <form onSubmit={handleSubmit} className="flex items-center px-4 border-b-2 border-black dark:border-gray-700">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Cari artikel..."
                className="flex-1 px-3 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base"
                autoComplete="off"
              />
              {loading && <Loader2 size={18} className="text-gray-400 animate-spin shrink-0" />}
              {!loading && query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0"
                  aria-label="Hapus pencarian"
                >
                  <X size={18} />
                </button>
              )}
            </form>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                {results.map((post, idx) => {
                  const category = post._embedded?.["wp:term"]?.[0]?.[0];
                  const excerpt = htmlToPlainText(post.excerpt.rendered).slice(0, 100);
                  const titleText = htmlToPlainText(post.title.rendered);
                  const categoryName = category ? htmlToPlainText(category.name) : "";
                  return (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={closeSearch}
                        className={`flex flex-col px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          idx === activeIndex ? "bg-gray-100 dark:bg-gray-800" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          {category && (
                            <span className="text-xs px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium">
                              {categoryName}
                            </span>
                          )}
                          <span className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                            {titleText}
                          </span>
                        </div>
                        {excerpt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{excerpt}</p>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* No results */}
            {!loading && query.trim() && results.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                Tidak ada artikel untuk &ldquo;{query}&rdquo;
              </div>
            )}

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t-2 border-black dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-400">
              <span>
                <kbd className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">↑↓</kbd> navigasi &nbsp;
                <kbd className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">↵</kbd> buka &nbsp;
                <kbd className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">Esc</kbd> tutup
              </span>
              {query.trim() && (
                <button
                  type="button"
                  onClick={handleSubmit as unknown as React.MouseEventHandler}
                  className="text-black dark:text-white font-medium hover:underline"
                >
                  Lihat semua hasil →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
