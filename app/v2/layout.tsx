import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Teguh Widodo — Full-Stack Developer & Designer',
  description: 'Portfolio of Teguh Widodo. Full-stack developer, digital builder, and technical writer from Yogyakarta.',
  openGraph: {
    title: 'Teguh Widodo — Full-Stack Developer & Designer',
    description: 'Portfolio of Teguh Widodo. Full-stack developer, digital builder, and technical writer.',
    url: 'https://teguhcoding.com/v2',
    type: 'website',
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
