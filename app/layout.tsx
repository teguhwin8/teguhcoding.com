import "./globals.css";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
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
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
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
    <html lang="en" suppressHydrationWarning>
      <body className={spaceMono.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded dark:focus:bg-gray-900 dark:focus:text-white dark:focus:border-white"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main id="main-content" className="retro-grid min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
