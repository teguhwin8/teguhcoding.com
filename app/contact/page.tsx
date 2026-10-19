import { Metadata } from "next";
import ContactChat from "@/components/contact-chat";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Ceritakan kebutuhan website atau aplikasi Anda. Asisten Teguh membantu merangkum detail sebelum diteruskan ke Teguh Widodo.",
  openGraph: {
    title: "Kontak — Teguh Widodo",
    description:
      "Ceritakan kebutuhan website atau aplikasi Anda kepada Asisten Teguh atau hubungi Teguh langsung lewat WhatsApp dan email.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactChat />;
}
