import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { LatestBlog } from "@/components/latest-blog";
import { getLatestPosts } from "@/lib/sanity";

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
