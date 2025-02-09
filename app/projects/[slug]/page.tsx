import { projects } from "@/lib/projects";
import { ArrowLeft, Blocks, Calendar, ExternalLink, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const project = projects.find((project) => project.slug === slug);

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
          <div className="relative aspect-[21/9] w-full">
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
              {/* {project.date && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={20} />
                  <span>{project.date}</span>
                </div>
              )} */}
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
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button w-full px-4 py-3 flex items-center justify-center"
              >
                <ExternalLink size={20} className="mr-2" />
                Live Demo
              </a>
            )}
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
