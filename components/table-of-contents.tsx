"use client";

import { useEffect, useState } from "react";
import { List, X } from "lucide-react";

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
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[var(--accent)] text-white p-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Toggle table of contents"
      >
        <List size={22} strokeWidth={2.5} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* TOC Container */}
      <aside
        className={`
          fixed z-50 transition-all duration-300 ease-out
          bg-[var(--card)] border border-[var(--border)]
          overflow-y-auto
          
          // Desktop: sidebar kanan
          lg:top-24 lg:right-6 lg:w-72 lg:max-h-[calc(100vh-8rem)]
          lg:rounded-2xl lg:shadow-lg
          
          // Mobile: bottom sheet premium
          bottom-0 left-0 right-0 
          max-h-[75vh] w-full
          rounded-t-3xl
          shadow-2xl
          
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
          lg:translate-x-0 lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto
          ${!isOpen && 'lg:translate-x-[calc(100%+2rem)]'}
        `}
      >
        {/* Drag Handle - Mobile Only */}
        <div className="lg:hidden flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-[var(--border)] rounded-full opacity-40" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 lg:px-5 pt-4 lg:pt-4 pb-3 border-b border-[var(--border)] lg:border-0">
          <div className="flex items-center gap-2.5">
            <List size={20} className="text-[var(--accent)] lg:w-4 lg:h-4" strokeWidth={2.5} />
            <h3 className="text-base lg:text-sm font-bold tracking-tight text-[var(--text)]">
              Daftar Isi
            </h3>
          </div>
          
          {/* Close Button - Mobile Only */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 -mr-2 hover:bg-[var(--border)] rounded-lg transition-colors"
            aria-label="Close table of contents"
          >
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 lg:px-4 py-5 lg:py-4">
          <ul className="space-y-1">
            {headings.map(({ id, text, level }) => {
              const isActive = activeId === id;
              const isH2 = level === 2;
              const isH3 = level === 3;
              
              return (
                <li key={id}>
                  <button
                    onClick={() => handleClick(id)}
                    className={`
                      group relative text-left w-full 
                      transition-all duration-200 ease-out
                      rounded-lg
                      ${isH2 ? 'py-2.5 px-3' : ''}
                      ${isH3 ? 'py-2 px-3 ml-4' : ''}
                      ${isActive ? 'bg-[var(--accent)]/8' : 'hover:bg-[var(--border)]/50'}
                    `}
                  >
                    {/* Active Indicator - Left Border */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-r-full transition-all duration-200"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                    )}
                    
                    {/* Text Content */}
                    <span
                      className={`
                        block transition-colors duration-200
                        ${isH2 ? 'text-sm lg:text-[13px] font-semibold leading-snug' : ''}
                        ${isH3 ? 'text-[13px] lg:text-xs font-medium leading-relaxed' : ''}
                        ${
                          isActive 
                            ? 'font-semibold' 
                            : ''
                        }
                      `}
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text)',
                        opacity: isActive ? 1 : (isH2 ? 0.85 : 0.65)
                      }}
                    >
                      {text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Gradient Fade - Mobile Only */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />
      </aside>
    </>
  );
}
