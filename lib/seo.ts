import type { Metadata } from "next";

export const SITE_URL = "https://teguhcoding.com";
export const SITE_NAME = "Teguh Widodo";
export const DEFAULT_OG_IMAGE = "/teguh.jpg";
export const TWITTER_HANDLE = "@teguhcoding";

type OgImage = { url: string; width?: number; height?: number; alt?: string };

const DEFAULT_OG: OgImage = {
  url: DEFAULT_OG_IMAGE,
  width: 800,
  height: 800,
  alt: "Foto profil Teguh Widodo - Software Engineer",
};

export const CONTACT = {
  email: "teguhwin8@gmail.com",
  telephone: "+6285868474405",
  whatsappUrl: "https://wa.me/6285868474405",
};

export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Teguh Widodo",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  jobTitle: "Senior Software Engineer",
  homeLocation: { "@type": "Place", name: "Yogyakarta, Indonesia" },
  sameAs: [
    "https://www.linkedin.com/in/teguhwin8/",
    "https://github.com/teguhwin8",
    "https://twitter.com/teguhcoding",
    "https://www.tiktok.com/@teguhcoding.id",
  ],
} as const;

export const ORGANIZATION = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "PT Kreasi Web Nusantara",
  url: `${SITE_URL}/jasa-pembuatan-website`,
  email: CONTACT.email,
  telephone: CONTACT.telephone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yogyakarta",
    addressCountry: "ID",
  },
  areaServed: { "@type": "Country", name: "Indonesia" },
  founder: { "@id": `${SITE_URL}/#person` },
  sameAs: ["https://www.instagram.com/kreasiwebnusantara/"],
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string | OgImage;
  type?: "website" | "article";
  publishedTime?: string;
  robots?: Metadata["robots"];
}

/**
 * Builds page metadata with canonical URL, Open Graph and Twitter tags.
 * Next.js shallow-merges `openGraph` per segment, so every page must
 * restate url/images instead of relying on the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image = DEFAULT_OG,
  type = "website",
  publishedTime,
  robots,
}: PageMetadataInput): Metadata {
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "id_ID",
      type,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      creator: TWITTER_HANDLE,
      images: [typeof image === "string" ? image : image.url],
    },
    ...(robots ? { robots } : {}),
  };
}

/** Converts markdown to a plain-text summary suitable for meta descriptions. */
export function toDescription(markdown: string, maxLength = 160): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
    .replace(/[*_~|]+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length).trim()}…`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Returns the hostname of a valid http(s) source URL, or null. */
export function sourceHost(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Extracts question/answer pairs from a "## FAQ" (or "## Pertanyaan ...")
 * section whose questions are "### " headings.
 */
export function extractFaq(markdown: string): { question: string; answer: string }[] {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const section = normalized.match(
    /^##\s+(?:FAQs?|Pertanyaan[^\n]*)[ \t]*\n([\s\S]*?)(?=^##\s|(?![\s\S]))/im,
  );
  if (!section) return [];
  return section[1]
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [questionLine, ...rest] = block.split("\n");
      return {
        question: questionLine.trim(),
        answer: toDescription(rest.join("\n"), 500),
      };
    })
    .filter((item) => item.question && item.answer);
}
