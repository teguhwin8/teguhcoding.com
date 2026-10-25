import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { LatestBlog } from "@/components/latest-blog";
import { MarqueeBar } from "@/components/marquee-bar";
import { getAllPosts } from "@/lib/markdown";
import { JsonLd } from "@/components/json-ld";
import { ORGANIZATION, PERSON, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

const HOME_DESCRIPTION =
  "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman di Next.js, React, NestJS. Lihat project, pengalaman kerja, dan blog.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Teguh Widodo — Senior Software Engineer & Web Developer",
    description: HOME_DESCRIPTION,
    path: "/",
    ogDescription:
      "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman membangun aplikasi web scalable.",
  }),
  title: { absolute: "Teguh Widodo — Senior Software Engineer & Web Developer" },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...PERSON,
      description: HOME_DESCRIPTION,
      knowsAbout: ["Next.js", "React", "NestJS", "TypeScript", "Web Development"],
    },
    ORGANIZATION,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "id-ID",
      publisher: { "@id": PERSON["@id"] },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const revalidate = 60;
export const dynamic = "force-static";

export default async function Home() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 9);

  return (
    <div>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <MarqueeBar />
      <FeaturedProjects />
      <LatestBlog posts={latestPosts} />
    </div>
  );
}
