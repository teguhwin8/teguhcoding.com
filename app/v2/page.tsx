'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function V2Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero title animation - kinetic typography
    if (heroTitleRef.current) {
      const words = heroTitleRef.current.querySelectorAll('.word');
      words.forEach((word, index) => {
        setTimeout(() => {
          word.classList.add('animate-in');
        }, index * 100);
      });
    }

    // Scroll indicator pulse
    if (scrollIndicatorRef.current) {
      const interval = setInterval(() => {
        scrollIndicatorRef.current?.classList.toggle('opacity-50');
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-white">teguh</span>
            <span className="text-orange-600">.dev</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#work"
              className="text-sm text-slate-300 hover:text-orange-500 transition"
            >
              Work
            </Link>
            <Link
              href="#blog"
              className="text-sm text-slate-300 hover:text-orange-500 transition"
            >
              Blog
            </Link>
            <Link
              href="#experience"
              className="text-sm text-slate-300 hover:text-orange-500 transition"
            >
              Experience
            </Link>
            <a
              href="https://wa.me/6285868474405"
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"
            >
              <span>Let&apos;s talk</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div ref={heroTitleRef} className="mb-6">
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4">
                  <span className="word inline-block opacity-0">Building</span>
                  <br />
                  <span className="word inline-block opacity-0">products</span>
                  <br />
                  <span className="word inline-block opacity-0 text-orange-500">that matter</span>
                </h1>
              </div>

              <p className="text-lg text-slate-400 mb-8 max-w-lg">
                Full-stack developer, technical writer &amp; digital builder from Yogyakarta. 
                I ship code that scales, write about what I learn, and design experiences that work.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://wa.me/6285868474405"
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
                >
                  Start a project
                  <ArrowRight size={18} />
                </a>
                <Link
                  href="#work"
                  className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-orange-500 text-white font-semibold rounded-lg transition"
                >
                  View work
                </Link>
              </div>

              <div className="flex gap-4 mt-12">
                <a
                  href="https://github.com"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:teguhwin8@gmail.com"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative h-96 md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent rounded-2xl border border-slate-800/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center">
                    <span className="text-4xl font-black">T</span>
                  </div>
                  <p className="text-slate-400">Teguh Widodo</p>
                  <p className="text-sm text-slate-500">Senior Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollIndicatorRef}
            className="flex justify-center items-center gap-2 text-slate-500 transition-opacity"
          >
            <span className="text-sm">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-slate-500 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-orange-600 rounded-full mt-1"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">Featured Work</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent"></div>
          </div>

          {/* Project 1 */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <p className="text-orange-500 font-semibold text-sm mb-2">01 / FEATURED PROJECT</p>
              <h3 className="text-3xl md:text-4xl font-black mb-4">AI Trip Planner</h3>
              <p className="text-slate-400 text-lg mb-6">
                Built a full-stack mobile app using React Native + Expo. Features AI-powered trip planning with Claude, real-time itinerary generation, interactive maps, and user authentication via Clerk.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">React Native</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">Expo</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">Claude API</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">Clerk</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold transition"
              >
                View case study
                <ArrowRight size={20} />
              </a>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <p className="text-sm">Project Preview</p>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 flex items-center justify-center order-2 md:order-1">
              <div className="text-center text-slate-500">
                <p className="text-sm">Project Preview</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-orange-500 font-semibold text-sm mb-2">02 / WEB PLATFORM</p>
              <h3 className="text-3xl md:text-4xl font-black mb-4">E-Learning Dashboard</h3>
              <p className="text-slate-400 text-lg mb-6">
                Designed and developed a modern e-learning platform with real-time progress tracking, interactive course modules, and seamless payment integration.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">Stripe</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">PostgreSQL</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold transition"
              >
                View case study
                <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange-500 font-semibold text-sm mb-2">03 / OPEN SOURCE</p>
              <h3 className="text-3xl md:text-4xl font-black mb-4">Component Library</h3>
              <p className="text-slate-400 text-lg mb-6">
                Created a comprehensive React component library with 50+ production-ready components, full TypeScript support, and extensive documentation.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">Storybook</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-slate-800 text-orange-500 rounded-full text-sm">npm</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold transition"
              >
                View on GitHub
                <ArrowRight size={20} />
              </a>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <p className="text-sm">Project Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

      {/* Featured Blog Section */}
      <section id="blog" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">Latest Stories</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Blog Card 1 */}
            <article className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition">
              <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-slate-600 text-center">
                  <p className="text-sm">Featured Image</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-orange-500 text-sm font-semibold mb-2">Tutorial</p>
                <h3 className="text-xl font-black mb-3 group-hover:text-orange-500 transition">
                  Tutorial Lengkap Claude Code untuk Bikin Aplikasi Mobile
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Panduan lengkap membangun aplikasi mobile production-ready dengan Claude Code, React Native, dan workflow terstruktur.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Jul 9, 2026</span>
                  <a href="/blog/tutorial-lengkap-claude-code-untuk-aplikasi-mobile" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition">
                    Read <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>

            {/* Blog Card 2 */}
            <article className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition">
              <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-slate-600 text-center">
                  <p className="text-sm">Featured Image</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-orange-500 text-sm font-semibold mb-2">Deep Dive</p>
                <h3 className="text-xl font-black mb-3 group-hover:text-orange-500 transition">
                  Building Scalable APIs with TypeScript &amp; Node.js
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Best practices untuk membangun API yang scalable, maintainable, dan production-ready dengan TypeScript.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Jun 15, 2026</span>
                  <a href="/blog" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition">
                    Read <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500/10 font-semibold rounded-lg transition">
              View all articles
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent"></div>
          </div>

          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="flex gap-6 pb-8 border-b border-slate-800 last:border-b-0">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center font-black">
                  01
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black mb-1">Senior Full-Stack Developer</h3>
                <p className="text-orange-500 text-sm font-semibold mb-2">Tech Company • 2023 - Present</p>
                <p className="text-slate-400 mb-3">
                  Leading development of large-scale web applications. Mentoring junior developers, architecting scalable systems, and implementing best practices across the team.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">Next.js</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">React</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="flex gap-6 pb-8 border-b border-slate-800 last:border-b-0">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center font-black">
                  02
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black mb-1">Full-Stack Developer</h3>
                <p className="text-orange-500 text-sm font-semibold mb-2">Startup • 2021 - 2023</p>
                <p className="text-slate-400 mb-3">
                  Built and shipped multiple products from scratch. Worked across the entire stack including frontend, backend, and DevOps. Grew the platform to 100k+ users.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">React</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">MongoDB</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">Docker</span>
                </div>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center font-black">
                  03
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black mb-1">Frontend Developer</h3>
                <p className="text-orange-500 text-sm font-semibold mb-2">Agency • 2019 - 2021</p>
                <p className="text-slate-400 mb-3">
                  Developed responsive web applications for various clients. Focused on performance optimization and user experience. Built custom solutions with modern web technologies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">Vue.js</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">Vanilla JS</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">WordPress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Let&apos;s build something <span className="text-orange-500">together</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Whether you&apos;re looking for a developer to join your team, need a custom solution, or want to discuss an idea — I&apos;m always open to interesting projects and conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6285868474405"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="mailto:teguhwin8@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 hover:border-orange-500 text-white font-semibold rounded-lg transition"
            >
              <span>Send an email</span>
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-2">
                <span className="text-white">teguh</span>
                <span className="text-orange-600">.dev</span>
              </div>
              <p className="text-slate-500">Full-stack developer &amp; technical writer</p>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com" className="text-slate-400 hover:text-orange-500 transition">
                <Github size={24} />
              </a>
              <a href="https://twitter.com" className="text-slate-400 hover:text-orange-500 transition">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-slate-400 hover:text-orange-500 transition">
                <Linkedin size={24} />
              </a>
              <a href="mailto:teguhwin8@gmail.com" className="text-slate-400 hover:text-orange-500 transition">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-sm text-center">
              © 2026 Teguh Widodo. Built with Next.js, Tailwind CSS &amp; Framer Motion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
