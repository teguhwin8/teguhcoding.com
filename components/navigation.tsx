"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, BookOpen, Briefcase, Home, Mail, FileText } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 retro-button px-4 py-2"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/experience"
              className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Briefcase size={20} />
              <span>Experience</span>
            </Link>
            <Link
              href="/projects"
              className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Code2 size={20} />
              <span>Projects</span>
            </Link>
            <Link
              href="/education"
              className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <BookOpen size={20} />
              <span>Education</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FileText size={20} />
              <span>Blog</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Mail size={20} />
              <span>Contact</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
