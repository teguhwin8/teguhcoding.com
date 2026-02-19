import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { LatestBlog } from "@/components/latest-blog";
import { getLatestPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Teguh Widodo — Senior Software Engineer & Web Developer",
  description:
    "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman di Next.js, React, Laravel. Lihat project, pengalaman kerja, dan blog.",
  openGraph: {
    title: "Teguh Widodo — Senior Software Engineer & Web Developer",
    description:
      "Portfolio Teguh Widodo — Senior Software Engineer dengan 6+ tahun pengalaman membangun aplikasi web scalable.",
    type: "website",
  },
};

export const revalidate = 60;
export const dynamic = "force-static";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <div className="pt-16">
      <Hero />
      <FeaturedProjects />
      <LatestBlog posts={latestPosts} />
    </div>
  );
}

