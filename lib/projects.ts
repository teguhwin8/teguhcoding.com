export const projects = [
  {
    id: 6,
    title: "Quran Online Indonesia",
    description:
      "Modern Al-Quran web app with Indonesian translation, audio murottal, and AI-powered Q&A",
    longDescription:
      "Quran Online Indonesia adalah aplikasi web modern untuk membaca Al-Quran dengan terjemahan Bahasa Indonesia. Dibangun dengan Next.js dan menerapkan desain minimalis yang nyaman untuk membaca. Dilengkapi dengan fitur audio murottal, AI Tanya Jawab untuk menjawab pertanyaan seputar Al-Quran, sistem bookmark, pencarian ayat berdasarkan kata kunci, dan download PDF untuk membaca offline.\n\nFitur utama:\n  - Audio murottal untuk setiap ayat dan surah\n  - AI Tanya Jawab dengan integrasi OpenAI\n  - Pencarian ayat berdasarkan kata kunci\n  - Bookmark ayat favorit\n  - Download surah dalam format PDF\n  - Mode tampilan Per Ayat dan Per Surat\n  - Dark Mode dan Light Mode\n  - Responsive design untuk semua perangkat",
    features: [
      "Audio Murottal Player",
      "AI-Powered Q&A (Tanya Jawab)",
      "Keyword-based Verse Search",
      "Bookmark System",
      "PDF Download for Offline Reading",
      "Dark Mode & Light Mode",
      "Responsive Design",
      "Progressive Web App (PWA)",
    ],
    image: "/quran.jpg",
    link: "/projects/quran-online",
    slug: "quran-online",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "PWA"],
    demo: "https://quranonline.teguhcoding.com",
  },
  {
    id: 1,
    title: "Travl",
    description: "Full Stack Travel Booking Platform. Build with Next.js and NestJS",
    longDescription:
      "Travl is a comprehensive travel booking platform built as a final project for RevoU's Full Stack Software Engineering program. It demonstrates advanced full-stack capabilities including secure authentication, complex database relationships, and a responsive frontend key features.",
    features: [
      "User Authentication & Authorization",
      "Flight and Hotel Booking System",
      "Payment Gateway Integration",
      "Admin Dashboard for Management",
      "Responsive Design for All Devices",
      "Unit Testing for Backend & Frontend",
    ],
    image: "/travl.jpg",
    link: "/projects/travl",
    slug: "travl",
    technologies: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Tailwind CSS",
      "Jest",
    ],
    demo: "https://travl.co.id",
  },
  {
    id: 5,
    title: "Sementigaroda Web",
    description:
      "A modern corporate website built with Next.js and Tailwind CSS",
    longDescription:
      "Sementigaroda's corporate website was developed to reflect the company's professionalism and innovative spirit. The site features interactive sections, animations powered by Framer Motion, and responsive designs built with Tailwind CSS. With a focus on speed and SEO, it helps the company effectively showcase its products and services while improving user engagement through a modern web experience.\n\nKey features include:\n  - Dynamic animations and transitions\n  - Interactive product galleries\n  - SEO-optimized pages\n  - Mobile-friendly and responsive design\n  - Fast loading times\n  - Secure contact forms",
    features: [
      "Dynamic animations and transitions",
      "Interactive product galleries",
      "SEO-optimized content",
      "Responsive design",
      "Fast loading performance",
      "Secure contact forms",
    ],
    image: "/semen.jpg",
    link: "/projects/sementigaroda",
    slug: "sementigaroda",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "https://sementigaroda.com",
  },
];
