"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Tailwind CSS",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    link: "/projects/e-commerce"
  },
  {
    id: 2,
    title: "Dashboard UI",
    description: "An analytics dashboard with real-time data visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "/projects/dashboard"
  },
  {
    id: 3,
    title: "Social Media App",
    description: "A social media application with real-time messaging",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    link: "/projects/social-media"
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={project.link} className="block">
                <div className="retro-card overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}