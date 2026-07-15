"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";
import { ArrowRight, FileDown } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[var(--text)] leading-[1.1] mb-6">
              Building the web,{" "}
              <span
                className="italic font-normal"
                style={{ fontFamily: "var(--font-instrument)" }}
              >
                one layer at a time.
              </span>
            </h1>

            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-xl mb-10">
              Senior Software Engineer dengan 6+ tahun pengalaman membangun
              aplikasi web scalable. Spesialisasi di React, Next.js, dan
              Laravel — dari desain UI sampai arsitektur backend.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/projects" className="btn-primary">
                Lihat Projects
                <ArrowRight size={15} />
              </Link>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileDown size={15} />
                Unduh CV
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: "6+", label: "Tahun pengalaman" },
                { value: "20+", label: "Proyek selesai" },
                { value: "3", label: "Perusahaan teknologi" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-[var(--text)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — photo + socials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-[var(--border)]">
              <Image
                src="/teguh.jpg"
                alt="Teguh Widodo — Senior Software Engineer"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                {
                  href: "https://github.com/teguhwin8",
                  icon: LuGithub,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/teguhwin8/",
                  icon: LuLinkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://twitter.com/teguhcoding",
                  icon: LuTwitter,
                  label: "Twitter",
                },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Name card */}
            <div className="text-center">
              <p className="font-semibold text-sm text-[var(--text)]">
                Teguh Widodo
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Yogyakarta, Indonesia
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
