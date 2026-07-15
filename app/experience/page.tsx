import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience — Software Engineer Career",
  description:
    "Pengalaman kerja Teguh Widodo sebagai Software Engineer: PHP Developer, Fullstack Developer, Frontend Engineer dengan keahlian di Next.js, Laravel, NestJS.",
  openGraph: {
    title: "Work Experience — Teguh Widodo",
    description:
      "Pengalaman kerja Teguh Widodo sebagai Software Engineer di berbagai perusahaan teknologi.",
    type: "website",
  },
};

const experiences = [
  {
    id: 1,
    title: "PHP Developer",
    company: "Capio Teknologi Indonesia",
    period: "May 2025 – July 2025",
    description:
      "Developed backend services using PHP to support real-time trading and portfolio management. Integrated third-party financial APIs and optimized transaction data flow for better performance. Collaborated with frontend and mobile teams to deliver secure, seamless, and scalable system integration.",
    technologies: ["PHP", "Backend Development", "API Integration"],
  },
  {
    id: 2,
    title: "Fullstack Developer",
    company: "PT Hijau Digital International",
    period: "March 2019 – Present",
    description:
      "Developed and maintained web applications using Laravel, Next.js, Vue.js and NestJS, improving client project delivery times by 20%. Rewrote existing HTML/CSS to align with SEO and accessibility standards, increasing organic traffic by 600%. Integrated AI-powered numerology engine for automated personality calculation.",
    technologies: ["Next.js", "Laravel", "Vue.js", "NestJS", "AI Integration"],
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "PT Majoo Teknologi Indonesia",
    period: "January 2022 – June 2023",
    description:
      "Participated in the rebuild of a 4-year-old SaaS platform from PHP CodeIgniter to a modern stack using Next.js, achieving a full redesign and feature migration within 6 months. Delivered 10,000s of lines of production code with a focus on performance and scalability, maintaining a near-zero production bug rate.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Junior Web Developer",
    company: "Politeknik Dharma Patria",
    period: "January 2018 – February 2019",
    description:
      "Worked with a team to build and maintain responsive websites using HTML, CSS, JavaScript, and PHP. Created learning materials on web programming for undergraduate students.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
  },
];

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
