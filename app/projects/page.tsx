import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform built with Next.js and Tailwind CSS. Features include real-time inventory management, cart functionality, and secure checkout process.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    link: "/projects/e-commerce",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "Dashboard UI",
    description:
      "An analytics dashboard with real-time data visualization. Includes customizable widgets, dark mode, and responsive design.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: ["React", "D3.js", "Styled Components"],
    link: "/projects/dashboard",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Social Media App",
    description:
      "A social media application with real-time messaging, post creation, and user interactions.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    link: "/projects/social-media",
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Projects</h1>
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
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
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
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
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-button px-4 py-2 flex items-center"
                    >
                      <Github size={20} className="mr-2" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-button px-4 py-2 flex items-center"
                    >
                      <ExternalLink size={20} className="mr-2" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
