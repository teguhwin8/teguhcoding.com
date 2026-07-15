"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WordPressPost } from "@/lib/types";
import { htmlToPlainText } from "@/lib/html-text";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setLoading(false); return; }
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

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center px-4"
          style={{ paddingTop: "80px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
            onClick={closeSearch}
          />

          {/* Panel */}
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-lg bg-white border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* Input row */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 border-b border-[var(--border)]"
            >
              <Search size={15} className="text-[var(--text-subtle)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Cari artikel..."
                className="flex-1 py-4 bg-transparent text-[var(--text)] placeholder-[var(--text-subtle)] focus:outline-none text-sm"
                autoComplete="off"
              />
              {loading && (
                <Loader2 size={15} className="text-[var(--text-subtle)] animate-spin shrink-0" />
              )}
              {!loading && query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-subtle)] hover:text-[var(--text)] shrink-0 transition-colors"
                  aria-label="Hapus"
                >
                  <X size={10} />
                </button>
              )}
            </form>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-64 overflow-y-auto divide-y divide-[var(--border)]">
                {results.map((post, idx) => {
                  const category = post._embedded?.["wp:term"]?.[0]?.[0];
                  const excerpt = post.excerpt?.rendered ? htmlToPlainText(post.excerpt.rendered).slice(0, 90) : "";
                  const titleText = post.title?.rendered ? htmlToPlainText(post.title.rendered) : "";
                  const categoryName = category?.name ? htmlToPlainText(category.name) : "";
                  return (
                    <li key={`${post.id}-${idx}`}>
                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={closeSearch}
                        className={`flex flex-col px-4 py-3 transition-colors ${
                          idx === activeIndex ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          {category && (
                            <span className="text-[10px] px-2 py-0.5 bg-[var(--text)] text-white rounded-full font-medium shrink-0">
                              {categoryName}
                            </span>
                          )}
                          <span className="font-medium text-[var(--text)] text-sm line-clamp-1">
                            {titleText}
                          </span>
                        </div>
                        {excerpt && (
                          <p className="text-xs text-[var(--text-subtle)] line-clamp-1">{excerpt}</p>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Empty */}
            {!loading && query.trim() && results.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-[var(--text-subtle)]">
                Tidak ada hasil untuk &ldquo;{query}&rdquo;
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface)]">
              <span className="flex items-center gap-1 text-[11px] text-[var(--text-subtle)]">
                {["↑↓", "↵", "Esc"].map((k) => (
                  <kbd key={k} className="px-1.5 py-0.5 border border-[var(--border)] rounded bg-white text-[10px]">
                    {k}
                  </kbd>
                ))}
              </span>
              {query.trim() && (
                <button
                  type="button"
                  onClick={handleSubmit as unknown as React.MouseEventHandler}
                  className="text-xs font-medium text-[var(--text)] hover:underline"
                >
                  Lihat semua →
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)] transition-colors bg-white text-xs"
        aria-label="Cari artikel (Ctrl+K)"
      >
        <Search size={13} />
        <span className="hidden sm:inline">Cari</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] border border-[var(--border)] rounded-full bg-[var(--surface)] text-[var(--text-subtle)] font-sans ml-0.5">
          ⌘K
        </kbd>
      </button>

      {/* Portal — renders at document.body, outside any transform context */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
