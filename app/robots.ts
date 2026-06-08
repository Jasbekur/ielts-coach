import { MetadataRoute } from "next";

const BASE_URL = "https://ieltssensei.uz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All search engine crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/_next/"],
      },
      // Googlebot
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/_next/"],
      },
      // Bingbot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
