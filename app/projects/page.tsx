import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Portfolio Web Development",
  description:
    "Koleksi proyek web development oleh Teguh Widodo. Termasuk aplikasi travel booking, Al-Quran online, dan corporate website menggunakan Next.js, React, dan TypeScript.",
  openGraph: {
    title: "Projects — Portfolio Teguh Widodo",
    description:
      "Koleksi proyek web development oleh Teguh Widodo menggunakan Next.js, React, dan TypeScript.",
    type: "website",
  },
};

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Work
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Projects
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg">
            Koleksi proyek web development yang sudah saya kerjakan.
          </p>
        </div>

        {/* Projects list */}
        <section aria-label="Daftar proyek">
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="clean-card overflow-hidden group">
                <div className="grid md:grid-cols-[2fr_3fr] gap-0">
                  {/* Image */}
                  <div className="relative h-56 md:h-full min-h-[220px] overflow-hidden">
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
                      <h2 className="text-xl font-semibold text-[var(--text)] mb-3">
                        {project.title}
                      </h2>
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
                        <ArrowRight size={13} />
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
