'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

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
    // Smooth scroll behavior
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
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Teguh<span className="text-orange-600">.dev</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            <Link href="#work" className="text-sm font-medium hover:text-orange-600 transition-colors duration-300">
              Recent Work
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-orange-600 transition-colors duration-300">
              About
            </Link>
            <a href="https://wa.me/6285868474405" className="text-sm font-medium hover:text-orange-600 transition-colors duration-300">
              Contact
            </a>
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-black/5">
            <div className="px-6 py-4 space-y-4">
              <Link href="#work" className="block text-sm font-medium">Recent Work</Link>
              <Link href="#about" className="block text-sm font-medium">About</Link>
              <a href="https://wa.me/6285868474405" className="block text-sm font-medium">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            {/* Animated greeting */}
            <div className="h-16 flex items-center">
              <h1 className="text-6xl md:text-7xl font-light tracking-tight">
                {greeting.text}
              </h1>
              <span className="text-sm text-slate-500 ml-4 opacity-0 animate-pulse">
                {greeting.lang}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-slate-700 leading-tight">
                I&apos;m a full-stack developer & designer. I help brands stand out in the digital era.
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-2xl">
                The combination of my passion for design, code & interaction positions me in a unique place. 
                Together we will set the new status quo.
              </p>
            </div>

            <div className="flex gap-4 pt-8">
              <a
                href="https://wa.me/6285868474405"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-orange-600 transition-all duration-300 text-sm font-medium"
              >
                Start a project
                <ArrowRight size={16} />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 border border-black hover:border-orange-600 hover:text-orange-600 transition-all duration-300 text-sm font-medium"
              >
                View my work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section id="work" className="py-20 px-6 border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-light mb-20">Recent Work</h3>

          <div className="space-y-32">
            {/* Project 1 */}
            <div className="group cursor-pointer">
              <Link href="#" className="block">
                <div className="mb-6 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg transform group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                    <div className="text-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm font-medium">AI Trip Planner</p>
                      <p className="text-xs text-slate-600">Mobile Application</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-2xl font-light mb-2">AI Trip Planner</h4>
                      <p className="text-slate-600 font-light leading-relaxed max-w-2xl">
                        A full-stack mobile app combining React Native, Expo, and Claude AI. Real-time trip itineraries, interactive maps, and seamless authentication.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">React Native</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">Expo</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">Claude API</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">Clerk Auth</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer">
              <Link href="#" className="block">
                <div className="mb-6 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg transform group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                    <div className="text-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm font-medium">E-Learning Platform</p>
                      <p className="text-xs text-slate-600">Web Application</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-2xl font-light mb-2">E-Learning Dashboard</h4>
                      <p className="text-slate-600 font-light leading-relaxed max-w-2xl">
                        Modern learning platform with real-time progress tracking, interactive modules, and payment integration. Built for scalability and user engagement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">Next.js</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">TypeScript</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">Stripe</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">PostgreSQL</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer">
              <Link href="#" className="block">
                <div className="mb-6 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg transform group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                    <div className="text-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm font-medium">Component Library</p>
                      <p className="text-xs text-slate-600">Open Source</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-2xl font-light mb-2">React Component Library</h4>
                      <p className="text-slate-600 font-light leading-relaxed max-w-2xl">
                        Comprehensive open-source library with 50+ production-ready components. Full TypeScript support with extensive documentation and Storybook integration.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">React</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">TypeScript</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">Storybook</span>
                    <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">npm</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-3xl font-light mb-8">About Me</h3>
              <div className="space-y-6 text-slate-600 font-light leading-relaxed">
                <p>
                  I&apos;m a full-stack developer with 6+ years of experience building products that matter. 
                  My passion lies at the intersection of design, code, and user experience.
                </p>
                <p>
                  I believe great digital experiences come from deep collaboration and attention to detail. 
                  Whether it&apos;s a mobile app, web platform, or interactive tool, I approach every project 
                  with the goal of creating something truly exceptional.
                </p>
                <p>
                  When I&apos;m not coding, I write about web development, design systems, and the future of AI in software.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-8">Skills & Technologies</h4>
              <div className="space-y-8">
                <div>
                  <h5 className="text-sm font-medium text-black/60 mb-3">Frontend</h5>
                  <p className="text-sm font-light text-slate-600">
                    React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Vue.js
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-black/60 mb-3">Backend</h5>
                  <p className="text-sm font-light text-slate-600">
                    Node.js, Express, PostgreSQL, MongoDB, Prisma, API Design
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-black/60 mb-3">Tools</h5>
                  <p className="text-sm font-light text-slate-600">
                    Git, Docker, AWS, Vercel, Figma, Webflow, Claude AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-light mb-6">
            Ready to work together?
          </h3>
          <p className="text-lg text-slate-600 font-light mb-12">
            Whether you have a project in mind or just want to chat, feel free to reach out. 
            I&apos;m always interested in new opportunities and collaborations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/6285868474405"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-orange-600 transition-all duration-300 font-medium text-sm"
            >
              Chat on WhatsApp
              <ArrowRight size={18} />
            </a>
            <a
              href="mailto:teguhwin8@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 border border-black hover:border-orange-600 hover:text-orange-600 transition-all duration-300 font-medium text-sm"
            >
              Send Email
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <Link href="/" className="text-lg font-semibold">
                Teguh<span className="text-orange-600">.dev</span>
              </Link>
              <p className="text-sm text-slate-600 font-light mt-2">
                Full-stack developer & digital builder
              </p>
            </div>
            
            <div className="flex gap-8">
              <a href="https://github.com" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">
                Twitter
              </a>
              <a href="https://linkedin.com" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">
                LinkedIn
              </a>
              <a href="https://wa.me/6285868474405" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-black/5 pt-8">
            <p className="text-sm text-slate-600 font-light text-center">
              © 2026 Teguh Widodo. Built with Next.js, Tailwind CSS & Framer Motion.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        html {
          scroll-behavior: smooth;
        }

        a {
          position: relative;
        }

        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0.5px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }

        a:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
