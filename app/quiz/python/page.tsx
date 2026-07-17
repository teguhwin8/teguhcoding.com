"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Apa output dari code Python ini?",
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
    correctAnswer: 1,
    explanation:
      "List di Python adalah mutable dan passed by reference. Ketika y = x, kedua variable menunjuk ke object yang sama di memory. Perubahan di y otomatis tercermin di x.",
  },
  {
    id: 2,
    question: "Mana pernyataan yang BENAR tentang list comprehension di Python?",
    options: [
      "Lebih lambat dari for loop biasa",
      "Tidak bisa pakai if condition",
      "Lebih readable dan concise untuk operasi sederhana",
      "Hanya bisa untuk list, tidak untuk dict",
    ],
    correctAnswer: 2,
    explanation:
      "List comprehension lebih readable dan concise untuk operasi sederhana. Bisa pakai if condition, ada dict/set comprehension juga, dan biasanya lebih cepat dari for loop biasa.",
  },
  {
    id: 3,
    question: "Apa hasil dari code ini?",
    code: `def modify(lst):
    lst = [1, 2, 3]

my_list = [10, 20]
modify(my_list)
print(my_list)`,
    options: ["[1, 2, 3]", "[10, 20]", "[10, 20, 1, 2, 3]", "Error"],
    correctAnswer: 1,
    explanation:
      "Assignment lst = [1, 2, 3] di dalam function membuat local variable baru, bukan mengubah my_list. Untuk modify in-place, harus pakai lst[:] = [1, 2, 3] atau lst.append().",
  },
  {
    id: 4,
    question: "Cara paling efisien untuk cek membership di Python?",
    options: [
      "if x in my_list:",
      "if x in my_set:",
      "if x in my_dict:",
      "Sama saja semua",
    ],
    correctAnswer: 1,
    explanation:
      "Set membership check adalah O(1) average case karena menggunakan hash table. List membership adalah O(n) karena harus scan satu per satu. Dict key lookup juga O(1) tapi set lebih simpel untuk membership saja.",
  },
  {
    id: 5,
    question: "Apa output dari code ini?",
    code: `numbers = [1, 2, 3, 4, 5]
print(numbers[-2])`,
    options: ["3", "4", "5", "Error"],
    correctAnswer: 1,
    explanation:
      "Negative index di Python menghitung dari belakang. [-1] adalah elemen terakhir, [-2] adalah kedua dari belakang. Jadi numbers[-2] adalah 4.",
  },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

type Phase = "idle" | "answered";

export default function PythonQuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[current];
  const progress = ((current + (phase === "answered" ? 1 : 0)) / questions.length) * 100;
  const isCorrect = selected === question.correctAnswer;

  const handleSelect = (i: number) => {
    if (phase === "answered") return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setPhase("answered");
    if (selected === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setPhase("idle");
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setPhase("idle");
    setScore(0);
    setCompleted(false);
  };

  /* ── Result screen ── */
  if (completed) {
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-[var(--bg)] pt-28 pb-24 px-6 flex items-start justify-center">
        <div className="w-full max-w-lg">
          <div className="clean-card p-10 text-center space-y-8">
            {/* Big score */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)] mb-4">
                Python Basics — Hasil
              </p>
              <div className="text-8xl font-semibold text-[var(--text)] leading-none tabular-nums">
                {score}
                <span className="text-4xl text-[var(--text-subtle)] font-normal">
                  /{questions.length}
                </span>
              </div>
              <p className="mt-3 text-[var(--text-muted)]">
                {pct === 100
                  ? "Perfect. Semua benar."
                  : pct >= 60
                  ? "Lumayan solid. Tinggal polish beberapa bagian."
                  : "Keep at it — ulang lagi dan perhatikan penjelasannya."}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[var(--surface)] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[var(--text)] h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button onClick={handleRestart} className="btn-primary">
                <RotateCcw size={14} />
                Ulangi Quiz
              </button>
              <a href="/quiz" className="btn-secondary">
                Quiz Lain
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Quiz screen ── */
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)] mb-1">
              Python Basics
            </p>
            <a
              href="/quiz"
              className="text-xs text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              ← Kembali
            </a>
          </div>
          <div className="text-right">
            <span className="text-3xl font-semibold text-[var(--text)] font-mono tabular-nums leading-none">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-[var(--text-subtle)] font-mono">
              /{String(questions.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[var(--surface)] rounded-full h-px mb-10 overflow-visible relative">
          <div
            className="absolute top-0 left-0 h-px bg-[var(--text)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="clean-card p-8 space-y-7">
          <h2 className="text-xl font-semibold text-[var(--text)] leading-snug">
            {question.question}
          </h2>

          {/* Code block */}
          {question.code && (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-x-auto">
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--border)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
              </div>
              <pre className="px-5 py-4 text-sm font-mono text-[var(--text)] leading-relaxed">
                <code>{question.code}</code>
              </pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              const showCorrect = phase === "answered" && i === question.correctAnswer;
              const showWrong = phase === "answered" && isSelected && !isCorrect;

              let base =
                "w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-[var(--radius)] border text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2";

              if (showCorrect) {
                base += " border-[#111] bg-[var(--text)] text-white";
              } else if (showWrong) {
                base += " border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-muted)] line-through";
              } else if (isSelected) {
                base += " border-[var(--text)] bg-[var(--surface)] text-[var(--text)]";
              } else if (phase === "answered") {
                base += " border-[var(--border)] text-[var(--text-subtle)] opacity-50";
              } else {
                base +=
                  " border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text)] cursor-pointer";
              }

              return (
                <button
                  key={i}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelect(i)}
                  disabled={phase === "answered"}
                  className={base}
                >
                  <span
                    className={`text-xs font-mono font-semibold w-5 shrink-0 ${
                      showCorrect
                        ? "text-white"
                        : "text-[var(--text-subtle)]"
                    }`}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && (
                    <CheckCircle2 size={16} className="shrink-0 text-white" />
                  )}
                  {showWrong && (
                    <XCircle size={16} className="shrink-0 text-[var(--text-subtle)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {phase === "answered" && (
            <div className="border-t border-[var(--border)] pt-6">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2">
                {isCorrect ? "✓ Benar" : "✗ Kurang tepat"}
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="mt-5 flex justify-between items-center">
          <span className="text-xs font-mono text-[var(--text-subtle)]">
            Score: {score}/{current + (phase === "answered" ? 1 : 0)}
          </span>

          {phase === "idle" ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`btn-primary ${
                selected === null ? "opacity-40 cursor-not-allowed" : ""
              }`}
              aria-disabled={selected === null}
            >
              Cek Jawaban
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              {current < questions.length - 1 ? "Soal Berikutnya" : "Lihat Hasil"}
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
