import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Keep the admin dashboard out of search indexes without listing it in robots.txt.
    return [
      {
        source: "/bahlil/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/bahlil",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
