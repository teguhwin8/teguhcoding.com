"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface QuizCard {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  difficulty: string;
  difficultyLevel: 1 | 2 | 3;
  href: string;
  available: boolean;
  emoji: string;
}

const quizzes: QuizCard[] = [
  {
    id: "python",
    title: "Python Basics",
    description:
      "Variables, loops, functions, list & dict — fondasi yang harus solid sebelum lanjut ke hal yang lebih kompleks.",
    totalQuestions: 5,
    difficulty: "Beginner",
    difficultyLevel: 1,
    href: "/quiz/python",
    available: true,
    emoji: "🐍",
  },
  {
    id: "javascript",
    title: "JavaScript ES6+",
    description:
      "Arrow functions, destructuring, promises, dan modern JS patterns.",
    totalQuestions: 10,
    difficulty: "Intermediate",
    difficultyLevel: 2,
    href: "/quiz/javascript",
    available: false,
    emoji: "⚡",
  },
  {
    id: "react",
    title: "React Fundamentals",
    description:
      "Hooks, state management, component lifecycle, dan rendering behavior.",
    totalQuestions: 10,
    difficulty: "Intermediate",
    difficultyLevel: 2,
    href: "/quiz/react",
    available: false,
    emoji: "⚛️",
  },
];

const difficultyDots = (level: 1 | 2 | 3) => (
  <span className="flex items-center gap-0.5" aria-hidden="true">
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        className={`inline-block w-1.5 h-1.5 rounded-full ${
          i <= level ? "bg-[var(--text)]" : "bg-[var(--border-strong)]"
        }`}
      />
    ))}
  </span>
);

export default function QuizIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[var(--text-subtle)] mb-5 font-mono">
            Quiz / Index
          </p>
          <h1 className="text-5xl font-semibold text-[var(--text)] leading-tight mb-4">
            Test your skills.
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
            Pilih topik, jawab soalnya, dan lihat seberapa dalam pemahaman lo.
            Setiap soal ada penjelasannya.
          </p>
        </header>

        {/* Quiz List */}
        <div className="space-y-3">
          {quizzes.map((quiz, index) => {
            const num = String(index + 1).padStart(2, "0");

            if (!quiz.available) {
              return (
                <div
                  key={quiz.id}
                  className="flex items-center gap-6 px-6 py-5 rounded-[var(--radius)] border border-[var(--border)] opacity-40 cursor-not-allowed select-none"
                  aria-disabled="true"
                >
                  <span className="text-xs font-mono text-[var(--text-subtle)] w-6 shrink-0">
                    {num}
                  </span>
                  <span className="text-2xl shrink-0" aria-hidden="true">
                    {quiz.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="font-medium text-[var(--text-muted)]">
                        {quiz.title}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-subtle)]">
                        <Lock size={10} />
                        Segera hadir
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-subtle)] truncate">
                      {quiz.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {difficultyDots(quiz.difficultyLevel)}
                    <span className="text-xs text-[var(--text-subtle)] font-mono hidden sm:block">
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={quiz.id}
                href={quiz.href}
                className="group flex items-center gap-6 px-6 py-5 rounded-[var(--radius)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-200 bg-[var(--bg-card)]"
              >
                <span className="text-xs font-mono text-[var(--text-subtle)] w-6 shrink-0">
                  {num}
                </span>
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {quiz.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[var(--text)] mb-0.5 group-hover:underline underline-offset-2 decoration-[var(--border-strong)]">
                    {quiz.title}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] truncate">
                    {quiz.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  {difficultyDots(quiz.difficultyLevel)}
                  <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:block w-20 text-right">
                    {quiz.totalQuestions} soal
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-[var(--text-subtle)] group-hover:text-[var(--text)] group-hover:translate-x-0.5 transition-all duration-150"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-[var(--text-subtle)] font-mono">
          {quizzes.filter((q) => q.available).length} quiz tersedia —{" "}
          {quizzes.filter((q) => !q.available).length} segera hadir
        </p>
      </div>
    </div>
  );
}
