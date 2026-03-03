import { MetadataRoute } from "next";
import { getAllPostSlugsWithModified } from "@/lib/wordpress";
import { projects } from "@/lib/projects";

const BASE_URL = "https://teguhcoding.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/experience`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/education`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];

    // Dynamic blog post pages
    const postSlugs = await getAllPostSlugsWithModified();
    const blogPages: MetadataRoute.Sitemap = postSlugs.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.modified ? new Date(post.modified) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...blogPages, ...projectPages];
}
