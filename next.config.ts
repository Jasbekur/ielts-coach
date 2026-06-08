import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
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
