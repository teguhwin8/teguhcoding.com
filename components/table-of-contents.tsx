"use client";

import { useEffect, useMemo, useState } from "react";
import { List, X } from "lucide-react";
import GithubSlugger from "github-slugger";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

// Function to extract headings from markdown.
// IDs use github-slugger, the same slugger rehype-slug uses, so duplicate
// headings get the same "-1", "-2" suffixes as the rendered article.
function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const slugger = new GithubSlugger();
  const lines = markdown.split('\n');

  let inCodeBlock = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2]
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*_`]/g, '')
        .trim();
      // Slug every level so suffixes stay in sync, but only list h2/h3
      const id = slugger.slug(text);

      if (level === 2 || level === 3) {
        headings.push({ id, text, level });
      }
    }
  }

  return headings;
}

function HeadingList({
  headings,
  activeId,
  onSelect,
}: {
  headings: Heading[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {headings.map(({ id, text, level }) => {
        const isActive = activeId === id;
        const isH2 = level === 2;

        return (
          <li key={id}>
            <button
              onClick={() => onSelect(id)}
              className={`
                group relative text-left w-full rounded-lg
                transition-colors duration-200 ease-out
                ${isH2 ? 'py-2 px-3' : 'py-1.5 px-3 ml-3'}
                ${isActive ? 'bg-[var(--surface)]' : 'hover:bg-[var(--surface)]'}
              `}
            >
              {/* Active Indicator - Left Border */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-r-full bg-[var(--accent)]" />
              )}

              <span
                className={`
                  block leading-snug transition-colors duration-200
                  ${isH2 ? 'text-[13px] font-semibold' : 'text-xs font-medium'}
                  ${isH2 || isActive ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}
                `}
              >
                {text}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop: sticky sidebar next to the article */}
      <aside className="hidden xl:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="flex items-center gap-2 px-3 mb-3">
          <List size={15} className="text-[var(--text-muted)]" strokeWidth={2.5} />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Daftar Isi
          </h3>
        </div>
        <nav>
          <HeadingList headings={headings} activeId={activeId} onSelect={handleClick} />
        </nav>
      </aside>

      {/* Mobile & tablet: floating button + bottom sheet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed bottom-6 right-6 z-50 bg-[var(--accent)] text-white p-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Toggle table of contents"
      >
        <List size={22} strokeWidth={2.5} />
      </button>

      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          xl:hidden fixed bottom-0 left-0 right-0 z-50
          max-h-[75vh] overflow-y-auto
          bg-[var(--bg-card)] border border-[var(--border)]
          rounded-t-3xl shadow-2xl
          transition-all duration-300 ease-out
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-[var(--border)] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-2 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <List size={20} className="text-[var(--accent)]" strokeWidth={2.5} />
            <h3 className="text-base font-bold tracking-tight text-[var(--text)]">
              Daftar Isi
            </h3>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
            aria-label="Close table of contents"
          >
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        <nav className="px-4 py-5">
          <HeadingList headings={headings} activeId={activeId} onSelect={handleClick} />
        </nav>
      </div>
    </>
  );
}
