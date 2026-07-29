"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

// Function to extract headings from markdown
function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      headings.push({ id, text, level });
    }
  }
  
  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

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
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[var(--accent)] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle table of contents"
      >
        <List size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* TOC Container */}
      <aside
        className={`
          fixed top-24 right-6 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto
          bg-[var(--card)] border border-[var(--border)] rounded-xl p-4
          transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'}
          lg:translate-x-0
        `}
      >
        <h3 className="text-sm font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
          <List size={16} />
          Daftar Isi
        </h3>
        <nav>
          <ul className="space-y-2">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`
                    text-left text-sm w-full transition-colors
                    ${level === 3 ? 'pl-4' : ''}
                    ${
                      activeId === id
                        ? 'text-[var(--accent)] font-medium'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }
                  `}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
