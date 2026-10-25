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

export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Teguh Widodo",
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  jobTitle: "Senior Software Engineer",
  sameAs: ["https://www.tiktok.com/@teguhcoding.id"],
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
