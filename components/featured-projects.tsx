"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function FeaturedProjects() {
  return (
    <section className="py-20 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
              Work
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text)] tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            All projects
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="clean-card overflow-hidden group">
                <div className="grid md:grid-cols-[2fr_3fr] gap-0">
                  {/* Image */}
                  <div className="relative h-56 md:h-full min-h-[200px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 40vw, 100vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text)] mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tag-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={project.link}
                        className="btn-secondary text-xs py-2 px-4"
                      >
                        Detail
                      </Link>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs py-2 px-4"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="btn-secondary text-sm">
            Semua projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
