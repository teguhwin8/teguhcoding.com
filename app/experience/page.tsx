import { Metadata } from "next";
import { experiences } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Work Experience — Software Engineer Career",
  description:
    "Pengalaman kerja Teguh Widodo sebagai Software Engineer: PHP Developer, Fullstack Developer, Frontend Engineer dengan keahlian di Next.js, React, NestJS.",
  openGraph: {
    title: "Work Experience — Teguh Widodo",
    description:
      "Pengalaman kerja Teguh Widodo sebagai Software Engineer di berbagai perusahaan teknologi.",
    type: "website",
  },
};

export default function Experience() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Career
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Work Experience
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg">
            Perjalanan karir saya sebagai Software Engineer selama 6+ tahun.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)] hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <article key={exp.id} className="md:pl-8 relative">
                {/* Dot */}
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[var(--text)] hidden md:block" />

                <div className="clean-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text)]">
                        {exp.title}
                      </h2>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--text-subtle)] whitespace-nowrap mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tag-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
