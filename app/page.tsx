import { Hero } from '@/components/hero';
import { FeaturedProjects } from '@/components/featured-projects';
import { LatestBlog } from '@/components/latest-blog';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <FeaturedProjects />
      <LatestBlog />
    </div>
  );
}