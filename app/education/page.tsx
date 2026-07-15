import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education & Certifications",
  description:
    "Latar belakang pendidikan dan sertifikasi profesional Teguh Widodo: RevoU Full Stack Engineering, Alibaba Cloud, IDCamp, Udemy, dan lainnya.",
  openGraph: {
    title: "Education & Certifications — Teguh Widodo",
    description:
      "Latar belakang pendidikan dan sertifikasi profesional Teguh Widodo di bidang Software Engineering.",
    type: "website",
  },
};

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
    type: "Associate's Degree",
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
  },
  {
    id: 2,
    title: "Building Performance Web Apps",
    issuer: "IDCamp x Dicoding",
    date: "Jul 2024",
  },
  {
    id: 3,
    title: "JavaScript & Node.js for Engineers",
    issuer: "Kemenperin",
    date: "Jun 2023",
  },
  {
    id: 4,
    title: "Next.js & React – The Complete Guide",
    issuer: "Udemy",
    date: "Apr 2023",
  },
  {
    id: 5,
    title: "PHP Laravel Web Development",
    issuer: "BuildWithAngga",
    date: "Dec 2022",
  },
  {
    id: 6,
    title: "Advancing Career Program Batch 12",
    issuer: "Alterra Academy",
    date: "Oct 2021",
  },
  {
    id: 7,
    title: "Full Stack Software Engineering",
    issuer: "RevoU",
    date: "Aug 2025",
  },
  {
    id: 8,
    title: "React + Redux, PHP, JavaScript",
    issuer: "SoloLearn",
    date: "2020–2022",
  },
];

export default function Education() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Background
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Education & Certifications
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg">
            Latar belakang pendidikan dan sertifikasi profesional yang mendukung
            karir saya sebagai software engineer.
          </p>
        </div>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6">
            Education
          </h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="clean-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                      {edu.type}
                    </span>
                    <h3 className="text-base font-semibold text-[var(--text)] mt-0.5">
                      {edu.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--text-subtle)] whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {edu.description}
                </p>

                {edu.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((a) => (
                      <span key={a} className="tag-pill">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5">
            {certifications.map((cert) => (
              <div key={cert.id} className="clean-card p-5">
                <h3 className="text-sm font-semibold text-[var(--text)] mb-1.5">
                  {cert.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{cert.issuer}</p>
                <p className="text-xs text-[var(--text-subtle)] mt-1">
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
