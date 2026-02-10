import { Metadata } from "next";
import { Briefcase, Calendar } from "lucide-react";

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
      "Developed and maintained web applications using Laravel, Next.js, Vue.js and NestJS, improving client project delivery times by 20%. Rewrote existing HTML/CSS to align with SEO and accessibility standards, increasing organic traffic by 600%. integrated AI-powered numerology engine for automated personality calculation.",
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
      "Worked with a team to build and maintain responsive websites using HTML, CSS, JavaScript, and PHP. Created learning materials on web programming for undergraduate students at Politeknik Dharma Patria.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Work Experience</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12">Perjalanan karir saya sebagai Software Engineer.</p>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <article key={exp.id} className="retro-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{exp.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mt-1">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
