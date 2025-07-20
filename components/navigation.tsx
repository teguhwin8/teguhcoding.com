"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  BookOpen,
  Briefcase,
  Home,
  Mail,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: "/experience", icon: Briefcase, label: "Experience" },
    { href: "/projects", icon: Code2, label: "Projects" },
    { href: "/education", icon: BookOpen, label: "Education" },
    { href: "/blog", icon: FileText, label: "Blog" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ];

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-300">
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
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Home button */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 retro-button px-4 py-2"
              onClick={closeMenu}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="retro-button p-2"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t-2 border-black dark:border-gray-300"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 retro-card hover:translate-x-1 transition-transform duration-200"
                    onClick={closeMenu}
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
