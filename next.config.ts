import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:all*(webp|jpg|jpeg|png|gif|svg|ico|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy WordPress tag/category archive pages -> blog listing
      { source: "/tag/:slug*", destination: "/blog", permanent: true },
      { source: "/category/:slug*", destination: "/blog", permanent: true },
      // Legacy WordPress author archive pages -> homepage
      { source: "/author/:slug*", destination: "/", permanent: true },
      // Legacy WordPress date archive pages (e.g. /2025/, /2025/03/, /2025/03/page/2/) -> blog listing
      { source: "/:year(20\\d{2})", destination: "/blog", permanent: true },
      { source: "/:year(20\\d{2})/:rest*", destination: "/blog", permanent: true },
      // Legacy WordPress core/system pages that no longer apply
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/comments/feed", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
