"use client";

import { useState } from "react";

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
    question: "Apa output dari code JavaScript ini?",
    code: `console.log(typeof null);`,
    options: ["null", "undefined", "object", "number"],
    correctAnswer: 2,
    explanation:
      "Di JavaScript, typeof null mengembalikan 'object'. Ini adalah bug legacy yang sudah bertahan sejak awal JavaScript dan tidak bisa diperbaiki karena akan break banyak code.",
  },
  {
    id: 2,
    question: "Mana yang BUKAN cara correct untuk declare array kosong di JavaScript?",
    code: undefined,
    options: [
      "const arr = []",
      "const arr = new Array()",
      "const arr = Array.of()",
      "const arr = Array(null)",
    ],
    correctAnswer: 3,
    explanation:
      "Array(null) akan throw error. Array.of() adalah cara valid untuk create array. Array(null) mencoba create array dengan size null yang invalid.",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after submission

    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    let message = "";
    let emoji = "";

    if (percentage === 100) {
      message = "Perfect! Lo master banget! 🔥";
      emoji = "🏆";
    } else if (percentage >= 50) {
      message = "Lumayan! Masih bisa improve nih 💪";
      emoji = "👍";
    } else {
      message = "Keep learning! Practice makes perfect 📚";
      emoji = "💪";
    }

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <div className="text-8xl mb-4">{emoji}</div>
            <h1 className="text-4xl font-bold">Quiz Selesai!</h1>
            <div className="text-6xl font-bold text-blue-400">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-gray-400">{message}</p>
            <div className="pt-8">
              <button
                onClick={handleRestartQuiz}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Main Lagi 🔄
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">JavaScript Quiz 🎯</h1>
            <div className="text-sm text-gray-400">
              Soal {currentQuestion + 1} dari {questions.length}
            </div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#111] border border-gray-800 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold">{question.question}</h2>

          {/* Code Block */}
          {question.code && (
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-green-400">
                <code>{question.code}</code>
              </pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              const showCorrect = showExplanation && isCorrectAnswer;
              const showWrong = showExplanation && isSelected && !isCorrect;

              let buttonClass =
                "w-full text-left p-4 rounded-lg border transition-all duration-200 ";

              if (showCorrect) {
                buttonClass += "bg-green-900/30 border-green-600 text-green-400";
              } else if (showWrong) {
                buttonClass += "bg-red-900/30 border-red-600 text-red-400";
              } else if (isSelected) {
                buttonClass += "bg-blue-900/30 border-blue-600 text-blue-400";
              } else {
                buttonClass +=
                  "bg-[#0a0a0a] border-gray-800 hover:border-gray-600 text-gray-300";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-gray-500">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                    </span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showWrong && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div
              className={`p-4 rounded-lg border ${
                isCorrect
                  ? "bg-green-900/20 border-green-800"
                  : "bg-red-900/20 border-red-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{isCorrect ? "🎉" : "💡"}</span>
                <div>
                  <p className="font-semibold mb-2">
                    {isCorrect ? "Benar!" : "Kurang Tepat"}
                  </p>
                  <p className="text-sm text-gray-300">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  selectedAnswer === null
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Submit Jawaban
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                {currentQuestion < questions.length - 1
                  ? "Soal Berikutnya →"
                  : "Lihat Hasil 🎯"}
              </button>
            )}
          </div>
        </div>

        {/* Score */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Score saat ini: {score} / {currentQuestion + (showExplanation ? 1 : 0)}
        </div>
      </div>
    </div>
  );
}
