import { BookOpen, Calendar, Award } from "lucide-react";

const education = [
  {
    id: 1,
    type: "Degree",
    title: "Bachelor of Science in Computer Science",
    institution: "Tech University",
    period: "2014 - 2018",
    description:
      "Focused on software engineering and web technologies. Graduated with honors.",
    achievements: ["Dean's List", "Best Capstone Project"],
  },
];

const certifications = [
  {
    id: 1,
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    link: "#",
  },
  {
    id: 2,
    title: "Professional Frontend Developer",
    issuer: "Meta",
    date: "2022",
    link: "#",
  },
  {
    id: 3,
    title: "React Advanced Concepts",
    issuer: "Frontend Masters",
    date: "2022",
    link: "#",
  },
];

export default function Education() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Education & Certifications</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-2" />
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="retro-card p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{edu.title}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span>{edu.period}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{edu.description}</p>
              {edu.achievements.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Award className="mr-2" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5">
            {certifications.map((cert) => (
              <div key={cert.id} className="retro-card p-6">
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-600 mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
