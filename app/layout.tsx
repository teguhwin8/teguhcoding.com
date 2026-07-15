import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Agentation } from "agentation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teguhcoding.com"),
  title: {
    default: "Teguh Widodo — Senior Software Engineer & Web Developer",
    template: "%s | Teguh Widodo",
  },
  description:
    "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman membangun aplikasi web scalable menggunakan Next.js, React, Laravel, dan TypeScript.",
  keywords: [
    "Teguh Widodo",
    "Software Engineer",
    "Frontend Developer",
    "Web Developer",
    "Next.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Teguh Widodo" }],
  creator: "Teguh Widodo",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://teguhcoding.com",
    siteName: "Teguh Widodo — Portfolio",
    title: "Teguh Widodo — Senior Software Engineer & Web Developer",
    description:
      "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman membangun aplikasi web scalable.",
    images: [
      {
        url: "/teguh.jpg",
        width: 800,
        height: 800,
        alt: "Foto profil Teguh Widodo - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teguh Widodo — Senior Software Engineer & Web Developer",
    description:
      "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman.",
    creator: "@teguhcoding",
    images: ["/teguh.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className={inter.className} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border focus:border-black focus:rounded-lg"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
