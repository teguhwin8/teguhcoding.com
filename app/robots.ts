import { MetadataRoute } from "next";

const BASE_URL = "https://teguhcoding.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/studio/", "/_next/"],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
