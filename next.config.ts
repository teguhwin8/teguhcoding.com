import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress.teguhcoding.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
