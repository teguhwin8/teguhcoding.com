import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Tech Corp",
    period: "2022 - Present",
    description:
      "Led the development of multiple high-impact web applications using React and Next.js. Improved performance metrics by 40% through optimization techniques.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description:
      "Developed responsive web applications for various clients. Implemented modern frontend practices and mentored junior developers.",
    technologies: ["Vue.js", "Nuxt.js", "JavaScript", "SCSS"],
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "Startup Inc",
    period: "2018 - 2020",
    description:
      "Built and maintained multiple client-facing web applications. Collaborated with designers to implement pixel-perfect interfaces.",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Work Experience</h1>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="retro-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{exp.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
