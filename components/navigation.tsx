"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname.startsWith("/bahlil") || pathname.startsWith("/v2")) {
    return null;
  }

  const navItems = [
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/education", label: "Education" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--border)]"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Wordmark */}
          <Logo onClick={() => setIsMenuOpen(false)} />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-150 ${
                  isActive(item.href)
                    ? "text-[var(--text)] font-medium"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
            <Link
              href="/contact"
              className="bg-[var(--text)] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[var(--accent-hover)] transition-colors"
            >
              Hire me
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <SearchBar />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-[var(--border)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-6xl mx-auto px-6 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-[var(--surface)] text-[var(--text)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-[var(--text)] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[var(--accent-hover)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hire me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
