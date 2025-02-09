import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Pena Digital",
    period: "March 2024 - Present",
    description:
      "As a Full Stack Developer, focused on developing robust and efficient web applications using Next.js, Nest.js, and Laravel. Contributed to the architecture, performance optimization, and implementation of new features while maintaining code quality.",
    technologies: ["Next.js", "Nest.js", "Laravel"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "PT Hijau Digital International",
    period: "March 2019 - Present",
    description:
      "Developed and maintained various web applications using Next.js and Laravel. Built dynamic and interactive user interfaces with Vue.js, ensuring seamless user experiences. Collaborated with cross-functional teams to design and implement scalable software solutions.",
    technologies: ["Next.js", "Laravel", "Vue.js"],
  },
  {
    id: 3,
    title: "Frontend Web Developer",
    company: "Majoo Indonesia",
    period: "January 2022 - July 2023",
    description:
      "Built responsive and high-performance web applications using Next.js. Worked closely with designers and backend developers to ensure smooth project integration and optimal performance.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: 4,
    title: "Full Stack Engineer",
    company: "Politeknik Dharma Patria",
    period: "January 2018 - March 2019",
    description:
      "Worked as a Full Stack Engineer covering both backend development using Laravel and frontend development using modern frameworks.",
    technologies: ["Laravel", "Vue.js", "JavaScript"],
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
