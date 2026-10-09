import { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Teguh Widodo untuk kolaborasi proyek web development, konsultasi teknis, atau kesempatan kerja. Berbasis di Yogyakarta, Indonesia.",
  openGraph: {
    title: "Kontak — Teguh Widodo",
    description:
      "Hubungi Teguh Widodo untuk kolaborasi proyek web development atau kesempatan kerja.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
