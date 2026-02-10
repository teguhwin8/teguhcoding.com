import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12">Koleksi proyek web development yang sudah saya kerjakan.</p>
        <section aria-label="Daftar proyek">
          <div className="grid grid-cols-1 gap-12">
            {projects.map((project) => (
              <div key={project.id} className="retro-card overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <Link
                        href={project.link}
                        className="retro-button px-4 py-2 flex items-center"
                      >
                        View Details
                      </Link>
                      {project?.demo && (
                        <Link
                          href={project?.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="retro-button px-4 py-2 flex items-center"
                        >
                          <ExternalLink size={20} className="mr-2" />
                          Demo
                        </Link>
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
