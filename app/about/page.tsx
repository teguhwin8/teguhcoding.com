import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { experiences } from "@/lib/experience";
import { CONTACT, ORGANIZATION, PERSON, SITE_URL, pageMetadata } from "@/lib/seo";

const PATH = "/about";
const DESCRIPTION =
  "Teguh Widodo adalah Senior Software Engineer dan fullstack developer dari Yogyakarta yang berpengalaman sejak 2018, pendiri PT Kreasi Web Nusantara.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Tentang Teguh Widodo — Senior Software Engineer",
    description: DESCRIPTION,
    path: PATH,
  }),
  title: { absolute: "Tentang Teguh Widodo — Senior Software Engineer" },
};

const skills = ["Next.js", "React", "TypeScript", "Laravel", "NestJS", "Vue.js", "Server & keamanan website"];

const PROFILE_LABELS: Record<string, string> = {
  "linkedin.com": "LinkedIn",
  "github.com": "GitHub",
  "twitter.com": "X / Twitter",
  "tiktok.com": "TikTok",
};

const profiles = PERSON.sameAs.map((url) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return { url, label: PROFILE_LABELS[host] ?? host };
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}${PATH}#profilepage`,
      url: `${SITE_URL}${PATH}`,
      inLanguage: "id-ID",
      mainEntity: {
        ...PERSON,
        description: DESCRIPTION,
        email: CONTACT.email,
        knowsAbout: skills,
        worksFor: { "@id": ORGANIZATION["@id"], "@type": ORGANIZATION["@type"], name: ORGANIZATION.name },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Tentang", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-14">
          <Image
            src="/teguh.jpg"
            alt="Foto Teguh Widodo"
            width={160}
            height={160}
            className="rounded-2xl border border-[var(--border)] object-cover"
            priority
          />
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
              Tentang
            </p>
            <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
              Teguh Widodo
            </h1>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Saya Teguh Widodo, Senior Software Engineer dan fullstack developer dari
              Yogyakarta. Saya membangun website dan aplikasi web sejak 2018, terutama dengan
              Next.js, React, Laravel, NestJS, dan Vue.js, dan juga menangani server serta
              keamanan website. Saya mendirikan{" "}
              <Link href="/jasa-pembuatan-website" className="underline underline-offset-2">
                PT Kreasi Web Nusantara
              </Link>{" "}
              untuk melayani pembuatan website dan aplikasi untuk bisnis, sekolah, dan instansi.
            </p>
          </div>
        </div>

        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6">
            Yang Saya Kerjakan
          </h2>
          <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
            <p>
              Di PT Majoo Teknologi Indonesia, saya ikut membangun ulang platform SaaS berumur
              empat tahun dari PHP CodeIgniter ke Next.js dalam enam bulan. Di PT Hijau Digital
              International, saya mengembangkan aplikasi web dengan Laravel, Next.js, Vue.js, dan
              NestJS, termasuk merapikan HTML/CSS agar sesuai standar SEO dan aksesibilitas.
            </p>
            <p>
              Selain membangun aplikasi, saya juga menangani keamanan website. Baru-baru ini saya
              membersihkan, memindahkan, dan mengamankan enam website, termasuk website sekolah,
              dari hosting yang disusupi judi online.
            </p>
            <p>
              Di{" "}
              <Link href="/blog" className="underline underline-offset-2">
                blog
              </Link>
              , saya mengkurasi dan menulis ulang berita serta tutorial teknologi dalam Bahasa
              Indonesia untuk developer lokal.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6">
            Pengalaman Kerja
          </h2>
          <ul className="space-y-3">
            {experiences.map((e) => (
              <li key={e.id} className="clean-card p-5 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-sm font-semibold text-[var(--text)]">
                  {e.title} · {e.company}
                </span>
                <span className="text-xs text-[var(--text-subtle)]">{e.period}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/experience" className="btn-secondary text-xs py-2 px-4">
              Detail pengalaman <ArrowRight size={13} />
            </Link>
            <Link href="/education" className="btn-secondary text-xs py-2 px-4">
              Pendidikan & sertifikasi <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6">
            Keahlian
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="tag-pill">
                {s}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-6">
            Profil & Kontak
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {profiles.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="underline underline-offset-2 text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-2 text-[var(--text-muted)] hover:text-[var(--text)]">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
