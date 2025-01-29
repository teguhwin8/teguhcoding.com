import "./globals.css";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Engineer Portfolio",
  description: "A retro-styled portfolio showcasing frontend engineering work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <Navigation />
        <main className="retro-grid min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
