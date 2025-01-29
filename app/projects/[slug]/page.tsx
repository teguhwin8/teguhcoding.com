import { ArrowLeft, Blocks, Calendar, ExternalLink, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";

const projectsData = {
  "e-commerce": {
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform built with Next.js and Tailwind CSS. Features include real-time inventory management, cart functionality, and secure checkout process.",
    longDescription: `
      This e-commerce platform was built to provide a seamless shopping experience for users while maintaining high performance and security standards.

      Key features include:
      - Real-time inventory tracking
      - Secure payment processing
      - Responsive design for all devices
      - Advanced search and filtering
      - User authentication and profiles
      - Order tracking and history
      - Admin dashboard for inventory management
    `,
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
    date: "2024",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "PostgreSQL",
      "Prisma",
      "Redux Toolkit",
      "Jest",
    ],
    features: [
      "Responsive Design",
      "Real-time Updates",
      "SEO Optimized",
      "Performance Optimized",
      "Secure Payments",
      "Analytics Integration",
    ],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  dashboard: {
    title: "Dashboard UI",
    description:
      "An analytics dashboard with real-time data visualization. Includes customizable widgets, dark mode, and responsive design.",
    longDescription: `
      A comprehensive analytics dashboard that provides real-time insights and data visualization for business metrics.

      Key features include:
      - Real-time data updates
      - Customizable dashboard layouts
      - Interactive charts and graphs
      - Dark mode support
      - Export functionality
      - Role-based access control
    `,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    date: "2024",
    technologies: [
      "React",
      "TypeScript",
      "D3.js",
      "Styled Components",
      "WebSocket",
      "Redux",
      "Vitest",
    ],
    features: [
      "Real-time Updates",
      "Dark Mode",
      "Responsive Layout",
      "Data Export",
      "Custom Charts",
      "User Preferences",
    ],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  "social-media": {
    title: "Social Media App",
    description:
      "A social media application with real-time messaging, post creation, and user interactions.",
    longDescription: `
      A modern social media platform that enables users to connect, share content, and communicate in real-time.

      Key features include:
      - Real-time messaging
      - Post creation and sharing
      - User profiles and connections
      - Media sharing
      - Notifications
      - Content moderation
    `,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
    date: "2024",
    technologies: [
      "React",
      "Firebase",
      "Tailwind CSS",
      "Socket.io",
      "Cloud Functions",
      "React Query",
      "Cypress",
    ],
    features: [
      "Real-time Chat",
      "Media Sharing",
      "User Profiles",
      "Notifications",
      "Content Feed",
      "Search Functionality",
    ],
    github: "https://github.com",
    demo: "https://demo.com",
  },
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Project Not Found</h1>
          <Link
            href="/projects"
            className="retro-button px-6 py-3 inline-flex items-center"
          >
            <ArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="retro-button px-4 py-2 inline-flex items-center mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to Projects
        </Link>
        <div className="retro-card overflow-hidden mb-8">
          <div className="relative h-[400px] w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-600 mb-6">{project.description}</p>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={20} />
                <span>{project.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="retro-button px-3 py-1 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button w-full px-4 py-3 flex items-center justify-center"
            >
              <LuGithub size={20} className="mr-2" />
              View Source
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button w-full px-4 py-3 flex items-center justify-center"
            >
              <ExternalLink size={20} className="mr-2" />
              Live Demo
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="retro-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Tag className="mr-2" /> Technologies
            </h2>
            <ul className="space-y-2">
              {project.technologies.map((tech) => (
                <li key={tech} className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="retro-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Blocks className="mr-2" /> Key Features
            </h2>
            <ul className="space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="retro-card p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Project Details</h2>
          <div className="prose max-w-none">
            {project.longDescription.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
