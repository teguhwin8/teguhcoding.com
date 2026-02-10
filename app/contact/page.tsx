import { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Hubungi Saya",
  description:
    "Hubungi Teguh Widodo untuk kolaborasi proyek web development, konsultasi teknis, atau kesempatan kerja. Berbasis di Yogyakarta, Indonesia.",
  openGraph: {
    title: "Contact — Teguh Widodo",
    description:
      "Hubungi Teguh Widodo untuk kolaborasi proyek web development atau kesempatan kerja.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
