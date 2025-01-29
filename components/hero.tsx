"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="relative w-48 h-48 mx-auto mb-8">
            <Image
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&q=80"
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-black shadow-xl"
              priority
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            Frontend Engineer
          </h1>
          <p className="text-xl mb-8">
            Crafting beautiful and performant web experiences with modern technologies
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}