'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const greetings = [
  { text: 'Hey', lang: 'English' },
  { text: 'Halo', lang: 'Indonesian' },
  { text: 'Konnichiwa', lang: 'Japanese' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
];

export default function V2Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState(greetings[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % greetings.length;
      setGreeting(greetings[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: 'tween',
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1, y: 0 },
    whileHover: { scale: 1.05, y: -5 },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Teguh<span className="text-orange-600">.dev</span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-12">
            {['Recent Work', 'About', 'Contact'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <Link
                  href={item === 'Recent Work' ? '#work' : item === 'About' ? '#about' : '#contact'}
                  className="text-sm font-medium text-black hover:text-orange-600 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-black/5"
          >
            <div className="px-6 py-4 space-y-4">
              <Link href="#work" className="block text-sm font-medium">Recent Work</Link>
              <Link href="#about" className="block text-sm font-medium">About</Link>
              <Link href="#contact" className="block text-sm font-medium">Contact</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Animated greeting */}
            <motion.div variants={itemVariants} className="h-20 flex items-center overflow-hidden">
              <motion.h1
                key={greeting.text}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="text-7xl md:text-8xl font-light tracking-tight"
              >
                {greeting.text}
              </motion.h1>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-slate-500 ml-6 font-light"
              >
                {greeting.lang}
              </motion.span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight">
                I&apos;m a full-stack developer & designer. I help brands stand out in the digital era.
              </h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                The combination of my passion for design, code & interaction positions me in a unique place. 
                Together we will set the new status quo. No nonsense, always on the cutting edge.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-8">
              <motion.a
                href="https://wa.me/6285868474405"
                whileHover={{ scale: 1.05, backgroundColor: '#ea580c' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-7 py-4 bg-black text-white font-medium text-sm transition-all duration-300"
              >
                Start a project
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#work"
                whileHover={{ borderColor: '#ea580c', color: '#ea580c' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-7 py-4 border border-black font-medium text-sm transition-all duration-300"
              >
                View my work
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section id="work" className="py-32 px-6 border-t border-black/5 bg-gradient-to-b from-transparent via-black/2 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-light mb-24"
          >
            Recent Work
          </motion.h3>

          <div className="space-y-40">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="group cursor-pointer"
            >
              <Link href="#" className="block">
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <motion.div
                    variants={imageVariants}
                    initial="initial"
                    whileHover="whileHover"
                    className="aspect-video bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center relative"
                  >
                    <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm font-medium">AI Trip Planner</p>
                      <p className="text-xs text-slate-600">Mobile Application</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-3xl font-light mb-3">AI Trip Planner</h4>
                      <p className="text-slate-600 font-light leading-relaxed max-w-2xl text-lg">
                        A full-stack mobile app combining React Native, Expo, and Claude AI. Real-time trip itineraries, 
                        interactive maps, and seamless authentication with Clerk.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-6">
                    {['React Native', 'Expo', 'Claude API', 'Clerk'].map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="px-4 py-2 bg-black/5 text-xs font-medium rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="group cursor-pointer"
            >
              <Link href="#" className="block">
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <motion.div
                    variants={imageVariants}
                    initial="initial"
                    whileHover="whileHover"
                    className="aspect-video bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center relative"
                  >
                    <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm font-medium">E-Learning Platform</p>
                      <p className="text-xs text-slate-600">Web Application</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-3xl font-light mb-3">E-Learning Dashboard</h4>
                      <p className="text-slate-600 font-light leading-relaxed max-w-2xl text-lg">
                        Modern learning platform with real-time progress tracking, interactive course modules, 
                        and seamless payment integration. Built for scale and engagement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-6">
                    {['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'].map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="px-4 py-2 bg-black/5 text-xs font-medium rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="group cursor-pointer"
            >
              <Link href="#" className="block">
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <motion.div
                    variants={imageVariants}
                    initial="initial"
                    whileHover="whileHover"
                    className="aspect-video bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center relative"
                  >
                    <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm font-medium">Component Library</p>
                      <p className="text-xs text-slate-600">Open Source</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-3xl font-light mb-3">React Component Library</h4>
                      <p className="text-slate-600 font-light leading-relaxed max-w-2xl text-lg">
                        Comprehensive open-source library with 50+ production-ready components. Full TypeScript support 
                        with extensive documentation and Storybook integration.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-6">
                    {['React', 'TypeScript', 'Storybook', 'npm'].map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="px-4 py-2 bg-black/5 text-xs font-medium rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-light mb-16"
          >
            About Me
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-slate-600 font-light leading-relaxed text-lg">
                I&apos;m a full-stack developer with 6+ years of experience building products that matter. 
                My passion lies at the intersection of design, code, and user experience.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-lg">
                I believe great digital experiences come from deep collaboration and attention to detail. 
                Whether it&apos;s a mobile app, web platform, or interactive tool, I approach every project 
                with the goal of creating something truly exceptional.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-lg">
                When I&apos;m not coding, I write about web development, design systems, and the future of AI in software.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h4 className="text-lg font-medium mb-4">Frontend</h4>
                <p className="text-slate-600 font-light leading-relaxed">
                  React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Vue.js, Webflow
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Backend</h4>
                <p className="text-slate-600 font-light leading-relaxed">
                  Node.js, Express, PostgreSQL, MongoDB, Prisma, GraphQL, REST APIs
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Tools & Platforms</h4>
                <p className="text-slate-600 font-light leading-relaxed">
                  Git, Docker, AWS, Vercel, Figma, Storybook, Claude AI, GitHub
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 border-t border-black/5 bg-gradient-to-b from-black/2 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-light mb-8"
          >
            Ready to work together?
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 font-light mb-16 leading-relaxed"
          >
            Whether you have a project in mind or just want to chat, feel free to reach out. 
            I&apos;m always interested in new opportunities and collaborations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="https://wa.me/6285868474405"
              whileHover={{ scale: 1.05, backgroundColor: '#ea580c' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium text-sm transition-all duration-300"
            >
              Chat on WhatsApp
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="mailto:teguhwin8@gmail.com"
              whileHover={{ borderColor: '#ea580c', color: '#ea580c' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-black font-medium text-sm transition-all duration-300"
            >
              Send Email
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12"
          >
            <div>
              <Link href="/" className="text-lg font-semibold">
                Teguh<span className="text-orange-600">.dev</span>
              </Link>
              <p className="text-sm text-slate-600 font-light mt-2">
                Full-stack developer & digital builder
              </p>
            </div>
            
            <div className="flex gap-12">
              {['GitHub', 'Twitter', 'LinkedIn', 'WhatsApp'].map((link, i) => (
                <motion.a
                  key={link}
                  href={
                    link === 'GitHub' ? 'https://github.com' :
                    link === 'Twitter' ? 'https://twitter.com' :
                    link === 'LinkedIn' ? 'https://linkedin.com' :
                    'https://wa.me/6285868474405'
                  }
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-sm font-medium text-slate-600 hover:text-black transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-black/5 pt-8"
          >
            <p className="text-sm text-slate-600 font-light text-center">
              © 2026 Teguh Widodo. Built with Next.js, Tailwind CSS & Framer Motion.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
