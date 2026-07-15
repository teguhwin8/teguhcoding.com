"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16 pb-16">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 */}
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-4">
              Error 404
            </p>
            <h1 className="text-8xl font-semibold text-[var(--text)] tracking-tight mb-0">
              404
            </h1>
          </div>

          {/* Message */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-3">
              Halaman tidak ditemukan
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Halaman yang kamu cari tidak ada atau sudah dipindahkan.
              Periksa kembali URL, atau kembali ke halaman utama.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              <Home size={15} />
              Kembali ke Home
            </Link>
            <Link href="/blog" className="btn-secondary">
              Baca Blog
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
