import { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Project Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `Screenshot proyek ${project.title}`,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-[var(--text)] mb-8">
            Project Not Found
          </h1>
          <Link href="/projects" className="btn-secondary">
            <ArrowLeft size={15} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Back to Projects
        </Link>

        {/* Hero image */}
        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-[var(--border)] mb-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-semibold text-[var(--text)] tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag-pill">
                  {tech}
                </span>
              ))}
            </div>

            {/* Long description */}
            <div className="clean-card p-6 mb-6">
              <h2 className="text-sm font-semibold text-[var(--text)] uppercase tracking-widest mb-4">
                Project Details
              </h2>
              <div className="space-y-3">
                {project.longDescription.split("\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm text-[var(--text-muted)] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="clean-card p-6">
              <h2 className="text-sm font-semibold text-[var(--text)] uppercase tracking-widest mb-4">
                Key Features
              </h2>
              <ul className="space-y-2.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)] mt-1.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}

            <div className="clean-card p-5">
              <h3 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-4">
                Technologies
              </h3>
              <ul className="space-y-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
