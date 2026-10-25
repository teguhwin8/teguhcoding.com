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
  async redirects() {
    return [
      {
        source: "/go/hostinger-ai",
        destination:
          "https://www.hostinger.com/cart?product=dockerhosting%3Astarter&period=24&referral_type=cart_link&REFERRALCODE=XNITEGUHWTKA&referral_id=01a17373-31b9-7396-bdeb-317be9f74a0c&vps_application_id=245",
        permanent: false,
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
