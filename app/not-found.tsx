"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search, FileText, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [isGlitching, setIsGlitching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      animateX: number;
      animateY: number;
      duration: number;
      delay: number;
    }>
  >([]);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const originalText = "404";

  // Initialize particles after component mounts
  useEffect(() => {
    setMounted(true);
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      animateX: Math.random() * 400 - 200,
      animateY: Math.random() * 400 - 200,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsGlitching(true);
      let iterations = 0;

      const glitchInterval = setInterval(() => {
        setGlitchText(
          originalText
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return glitchChars[
                Math.floor(Math.random() * glitchChars.length)
              ];
            })
            .join("")
        );

        if (iterations >= originalText.length) {
          clearInterval(glitchInterval);
          setIsGlitching(false);
          setGlitchText(originalText);
        }

        iterations += 1 / 3;
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  const suggestions = [
    "Check the URL for typos",
    "Go back to the homepage",
    "Explore our projects",
    "Read our latest blog posts",
    "Contact us for help",
  ];

  // Show simple loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-8xl md:text-9xl font-bold mb-4"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚀 Page Not Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full opacity-30"
              animate={{
                x: [0, particle.animateX],
                y: [0, particle.animateY],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            />
          ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Glitch 404 Text */}
          <motion.div
            className="relative"
            animate={isGlitching ? { x: [0, -2, 2, 0] } : {}}
            transition={{ duration: 0.1, repeat: isGlitching ? 3 : 0 }}
          >
            <h1
              className={`text-8xl md:text-9xl font-bold mb-4 relative ${
                isGlitching ? "text-red-500" : "text-black dark:text-white"
              }`}
              style={{
                fontFamily: '"Space Mono", monospace',
                textShadow: isGlitching
                  ? "2px 2px 0px #ff0000, -2px -2px 0px #00ff00"
                  : "none",
              }}
            >
              {glitchText}
            </h1>
            {isGlitching && (
              <>
                <span
                  className="absolute top-0 left-0 text-8xl md:text-9xl font-bold text-red-500 opacity-70"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  {glitchText}
                </span>
                <span
                  className="absolute top-0 left-0 text-8xl md:text-9xl font-bold text-blue-500 opacity-70"
                  style={{ transform: "translate(2px, 0)" }}
                >
                  {glitchText}
                </span>
              </>
            )}
          </motion.div>

          {/* Error message with typewriter effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🚀 Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Oops! It looks like this page got lost in the digital void. The
              page you&apos;re looking for doesn&apos;t exist or has been moved
              to another dimension. But don&apos;t worry, let&apos;s get you
              back on track! 🛸
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              href="/"
              className="retro-button px-6 py-3 flex items-center space-x-2 text-lg"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/projects"
              className="retro-button px-6 py-3 flex items-center space-x-2 text-lg bg-blue-200 dark:bg-blue-800 !text-blue-800 dark:!text-white"
            >
              <Search size={20} />
              <span>Explore Projects</span>
            </Link>

            <Link
              href="/blog"
              className="retro-button px-6 py-3 flex items-center space-x-2 text-lg bg-green-200 dark:bg-green-800 !text-green-800 dark:!text-white"
            >
              <FileText size={20} />
              <span>Read Blog</span>
            </Link>
          </motion.div>

          {/* Helpful suggestions */}
          <motion.div
            className="retro-card p-6 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
              <Zap className="mr-2" />
              What can you do instead?
            </h3>
            <ul className="space-y-2 text-left">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.3 }}
                >
                  <span className="w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full mr-3"></span>
                  {suggestion}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ASCII Art */}
          <motion.div
            className="mt-12 mb-16 text-xs font-mono text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <pre className="text-center overflow-hidden text-[10px] sm:text-xs">
              {`    ┌─────────────────────────────────┐
    │  ERROR: Page Not Found          │
    │  Status: 404                    │
    │  Location: Unknown              │
    │  Suggestion: Go back to safety  │
    └─────────────────────────────────┘`}
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
