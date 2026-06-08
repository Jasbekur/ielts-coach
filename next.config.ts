import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  // Prevent duplicate content from trailing slashes
  trailingSlash: false,

  // www → non-www redirect (Vercel handles HTTPS automatically)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ieltssensei.uz" }],
        destination: "https://ieltssensei.uz/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      // Supabase Storage
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // General HTTPS images (Unsplash, CDNs, etc.)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
