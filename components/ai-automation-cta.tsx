import React from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

interface AiAutomationCtaProps {
  className?: string;
}

export default function AiAutomationCta({ className = "" }: AiAutomationCtaProps) {
  return (
    <aside
      aria-label="Rekomendasi Hostinger AI Automation App"
      className={`rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg-card)] p-6 md:p-8 my-10 relative overflow-hidden clean-card ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--text)] text-[var(--bg)]">
          <Sparkles size={13} />
          Rekomendasi Developer
        </span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
          Diskon 20% Aktif
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-semibold text-[var(--text)] tracking-tight">
          Punya Asisten AI Pribadi 24 Jam di Telegram & WhatsApp Tanpa Setup Server
        </h3>
        <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
          Ingin bot AI pintar yang aktif nonstop untuk tugas harian, riset, atau otomasi bisnis? Hostinger AI Automation App siap dalam 60 detik berbasis Docker tanpa ribet instal Linux atau urus SSL.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6">
        <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--text)]">
          <Check size={16} className="text-emerald-500 shrink-0" />
          <span>Integrasi Telegram & WhatsApp bawaan</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--text)]">
          <Check size={16} className="text-emerald-500 shrink-0" />
          <span>Full CLI access & Docker environment</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--text)]">
          <Check size={16} className="text-emerald-500 shrink-0" />
          <span>Kredit AI bawaan + web search built-in</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--text)]">
          <Check size={16} className="text-emerald-500 shrink-0" />
          <span>Mulai Rp78.900/bln (hemat hingga Rp378rb)</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
        <div>
          <span className="text-xs text-[var(--text-subtle)] block">Harga promo hemat 20%</span>
          <span className="text-lg md:text-xl font-bold text-[var(--text)]">
            Rp78.900 <span className="text-xs font-normal text-[var(--text-muted)]">/bulan</span>
          </span>
        </div>

        <a
          href="/go/hostinger-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary justify-center text-sm font-medium py-2.5 px-5"
        >
          <span>Klaim Diskon 20% di Hostinger</span>
          <ArrowRight size={16} />
        </a>
      </div>

      <p className="mt-3 text-[11px] text-[var(--text-subtle)]">
        *Link referral resmi Hostinger. Dapatkan diskon 20% otomatis di halaman checkout.
      </p>
    </aside>
  );
}
