import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactChat from "@/components/contact-chat";

export const metadata: Metadata = pageMetadata({
  title: "Kontak",
  description:
    "Ceritakan kebutuhan website atau aplikasi Anda. Asisten Teguh membantu merangkum detail sebelum diteruskan ke Teguh Widodo.",
  path: "/contact",
  ogTitle: "Kontak — Teguh Widodo",
  ogDescription:
    "Ceritakan kebutuhan website atau aplikasi Anda kepada Asisten Teguh atau hubungi Teguh langsung lewat WhatsApp dan email.",
});

export default function ContactPage() {
  return <ContactChat />;
}
