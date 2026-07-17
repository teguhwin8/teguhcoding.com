"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";
import { Logo } from "./logo";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/bahlil") || pathname.startsWith("/v2")) {
    return null;
  }

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo className="mb-3" />
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Senior Software Engineer berbasis di Yogyakarta, Indonesia.
              Membangun web yang cepat, bersih, dan scalable.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { href: "https://github.com/teguhwin8", icon: LuGithub, label: "GitHub" },
                { href: "https://twitter.com/teguhcoding", icon: LuTwitter, label: "Twitter" },
                { href: "https://linkedin.com/in/teguhwin8/", icon: LuLinkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10">
            <nav aria-label="Footer navigation">
              <p className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-4">
                Pages
              </p>
              <ul className="space-y-2.5">
                {[
                  { href: "/", label: "Home" },
                  { href: "/experience", label: "Experience" },
                  { href: "/projects", label: "Projects" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-4">
                Contact
              </p>
              <ul className="space-y-2.5">
                <li className="text-sm text-[var(--text-muted)]">
                  teguhwin8@gmail.com
                </li>
                <li className="text-sm text-[var(--text-muted)]">
                  Yogyakarta, Indonesia
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-subtle)]">
            © {new Date().getFullYear()} teguhcoding.com
          </p>
          <p className="text-xs text-[var(--text-subtle)]">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
