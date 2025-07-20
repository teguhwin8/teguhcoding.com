"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";

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
              src="/teguh.jpg"
              alt="Teguh Widodo"
              fill
              className="rounded-full object-cover border-4 border-black dark:border-white shadow-xl"
              priority
            />
          </div>

          <h1 className="text-6xl font-bold mb-6">Teguh Coding</h1>
          <p className="text-xl mb-8">
            A Professional Web Developer Crafting Beautiful and Performant Web
            Experiences with Modern Technologies
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <motion.a
              href="https://github.com/teguhwin8"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LuGithub size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/teguhwin8/"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LuLinkedin size={24} />
            </motion.a>
            <motion.a
              href="https://twitter.com/teguhcoding"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LuTwitter size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
