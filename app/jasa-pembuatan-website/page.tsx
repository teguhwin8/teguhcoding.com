import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { services, terms } from "@/lib/chatbot/knowledge";
import { projects } from "@/lib/projects";
import { CONTACT, ORGANIZATION, SITE_URL, pageMetadata } from "@/lib/seo";

const PATH = "/jasa-pembuatan-website";
const DESCRIPTION =
  "Jasa pembuatan website dan aplikasi web dari Yogyakarta: company profile, website sekolah, toko online, aplikasi custom, dan keamanan website. Konsultasi gratis.";

const TITLE = "Jasa Pembuatan Website & Aplikasi Web | PT Kreasi Web Nusantara";

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH }),
  title: { absolute: TITLE },
};

const steps = [
  {
    title: "Konsultasi gratis",
    text: "Ceritakan kebutuhan, tujuan, dan target pengguna website atau aplikasi Anda lewat WhatsApp atau halaman kontak.",
  },
  {
    title: "Penawaran",
    text: "Setelah kebutuhan jelas, Teguh menyusun ruang lingkup pekerjaan dan harga final.",
  },
  {
    title: "Pengerjaan",
    text: "Dimulai setelah DP 50%. Proyek besar bisa dibayar bertahap per fase.",
  },
  {
    title: "Serah terima",
    text: "Pelunasan saat serah terima, disertai panduan singkat mengelola isi dan garansi perbaikan bug 30 hari.",
  },
];

const faq = [
  {
    question: "Berapa biaya pembuatan website di PT Kreasi Web Nusantara?",
    answer:
      "Biaya tergantung jenis website dan fitur yang dibutuhkan. Harga final ditentukan setelah kebutuhan jelas, dan konsultasi awal gratis. Hubungi lewat WhatsApp untuk mendapatkan kisaran harga sesuai kebutuhan Anda.",
  },
  {
    question: "Apa saja yang sudah termasuk dalam paket pembuatan website?",
    answer:
      "Tampilan responsif untuk HP dan desktop, SSL, SEO dasar, panduan singkat cara mengelola isi, dan garansi perbaikan bug 30 hari setelah serah terima.",
  },
  {
    question: "Apakah harga sudah termasuk hosting dan domain?",
    answer:
      "Belum. Biaya hosting dan domain dihitung terpisah sesuai kebutuhan website Anda.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "DP 50% di awal dan pelunasan saat serah terima. Untuk proyek besar, pembayaran bisa dicicil per tahap.",
  },
  {
    question: "Apakah melayani sekolah, instansi, atau yayasan?",
    answer:
      "Ya. Tersedia website sekolah/madrasah lengkap dengan modul PPDB online, serta invoice dan kuitansi resmi untuk sekolah, instansi, dan yayasan. Ada potongan harga jika beberapa website dikerjakan sekaligus.",
  },
  {
    question: "Website saya disusupi judi online, apakah bisa dibersihkan?",
    answer:
      "Bisa. Audit awal untuk mengecek apakah website disusupi judi online gratis, lengkap dengan bukti dan cara memperbaikinya. Setelah itu tersedia layanan pembersihan, proteksi bulanan, atau pemindahan ke hosting yang lebih aman.",
  },
  {
    question: "Teknologi apa yang digunakan?",
    answer:
      "Next.js, React, Laravel, NestJS, dan Vue.js, disesuaikan dengan kebutuhan proyek. Server dan keamanan website juga ditangani langsung.",
  },
  {
    question: "Berapa lama respons setelah menghubungi?",
    answer:
      "Biasanya dibalas di hari yang sama, paling lambat 1x24 jam di hari kerja.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...ORGANIZATION,
      description: DESCRIPTION,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan PT Kreasi Web Nusantara",
        itemListElement: services.map((group) => ({
          "@type": "OfferCatalog",
          name: group.category,
          itemListElement: group.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.name },
          })),
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Jasa Pembuatan Website", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

// "Konsultasi awal gratis" and the price disclaimer are covered elsewhere on the page.
const included = terms.filter((t) => t.startsWith("Sudah termasuk") || t.startsWith("Belum termasuk"));

export default function JasaPembuatanWebsite() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <JsonLd data={jsonLd} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
            PT Kreasi Web Nusantara
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Jasa Pembuatan Website & Aplikasi Web
          </h1>
          <p className="text-[var(--text-muted)] leading-relaxed mb-8">
            PT Kreasi Web Nusantara adalah jasa pembuatan website dan aplikasi web dari
            Yogyakarta yang dipimpin oleh{" "}
            <Link href="/about" className="underline underline-offset-2">
              Teguh Widodo
            </Link>
            , Senior Software Engineer yang berpengalaman sejak 2018. Mulai dari landing page,
            company profile, website sekolah, toko online, hingga aplikasi custom, keamanan
            website, dan perawatan rutin.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={15} />
              Mulai konsultasi gratis
            </a>
            <Link href="/projects" className="btn-secondary">
              Lihat portfolio
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Services */}
        <section className="mb-16" aria-labelledby="layanan-heading">
          <h2
            id="layanan-heading"
            className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6"
          >
            Layanan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((group) => (
              <div key={group.category} className="clean-card p-6">
                <h3 className="text-base font-semibold text-[var(--text)] mb-3">
                  {group.category}
                </h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-5">
                  {group.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-1 text-sm text-[var(--text-muted)]">
            {included.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="mb-16" aria-labelledby="proses-heading">
          <h2
            id="proses-heading"
            className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6"
          >
            Proses Kerja
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <li key={step.title} className="clean-card p-5">
                <span className="text-xs text-[var(--text-subtle)]">0{i + 1}</span>
                <h3 className="text-sm font-semibold text-[var(--text)] mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Portfolio */}
        <section className="mb-16" aria-labelledby="portfolio-heading">
          <h2
            id="portfolio-heading"
            className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6"
          >
            Contoh Proyek
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link key={project.slug} href={project.link} className="clean-card p-5 block">
                <h3 className="text-sm font-semibold text-[var(--text)] mb-1.5">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <div className="mb-16">
          <FaqSection items={faq} />
        </div>

        {/* CTA */}
        <section className="clean-card p-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-2">
            Siap membuat website?
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Konsultasi awal gratis. Biasanya dibalas di hari yang sama.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={15} />
              WhatsApp Teguh
            </a>
            <Link href="/contact" className="btn-secondary">
              Halaman kontak
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
