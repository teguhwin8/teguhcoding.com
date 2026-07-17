import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function JavaScriptQuizPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)] mb-8">
          JavaScript ES6+
        </p>
        <div className="clean-card p-10 text-center space-y-5">
          <p className="text-4xl" aria-hidden="true">⚡</p>
          <h1 className="text-2xl font-semibold text-[var(--text)]">
            Segera hadir
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
            Quiz JavaScript ES6+ sedang dalam pengerjaan. Cek lagi nanti.
          </p>
          <Link href="/quiz" className="btn-secondary inline-flex mt-4">
            <ArrowLeft size={14} />
            Kembali ke Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
