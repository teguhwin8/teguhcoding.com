import { BookOpen, Calendar, Award } from "lucide-react";

const education = [
  {
    id: 1,
    type: "Bootcamp",
    title: "Full Stack Software Engineering",
    institution: "RevoU",
    period: "March 2025 – August 2025",
    description:
      "Completed an intensive 25-week online program covering both frontend and backend development. Gained hands-on experience in building full-stack web applications using Next.js, NestJS, and database integration.",
    achievements: ["Final Project: Travl (Travel Booking Platform)"],
  },
  {
    id: 2,
    type: "Associate’s Degree",
    title: "Associate in Information Management",
    institution: "Politeknik Dharma Patria",
    period: "July 2011 – December 2014",
    description:
      "Graduated with GPA: 3.50. Final Project: Online Store Website using PHP and MySQL.",
    achievements: ["GPA: 3.50"],
  },
];

const certifications = [
  {
    id: 1,
    title: "Alibaba Cloud Certification – Apsara",
    issuer: "Alibaba Cloud Academy",
    date: "Sep 2024",
    link: "#",
  },
  {
    id: 2,
    title: "Building Performance Web Apps",
    issuer: "IDCamp x Dicoding",
    date: "Jul 2024",
    link: "#",
  },
  {
    id: 3,
    title: "JavaScript & Node.js for Engineers",
    issuer: "Kemenperin",
    date: "Jun 2023",
    link: "#",
  },
  {
    id: 4,
    title: "Next.js & React – The Complete Guide",
    issuer: "Udemy",
    date: "Apr 2023",
    link: "#",
  },
  {
    id: 5,
    title: "PHP Laravel Web Development",
    issuer: "BuildWithAngga",
    date: "Dec 2022",
    link: "#",
  },
  {
    id: 6,
    title: "Advancing Career Program Batch 12",
    issuer: "Alterra Academy",
    date: "Oct 2021",
    link: "#",
  },
  {
    id: 7,
    title: "Full Stack Software Engineering",
    issuer: "RevoU",
    date: "Aug 2025",
    link: "#",
  },
  {
    id: 8,
    title: "React + Redux, PHP, JavaScript",
    issuer: "SoloLearn",
    date: "2020–2022",
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
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.institution}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar size={16} />
                  <span>{edu.period}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {edu.description}
              </p>
              {edu.achievements.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
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
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {cert.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
