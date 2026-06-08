import { MetadataRoute } from "next";

const BASE_URL = "https://ieltssensei.uz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── All crawlers ───────────────────────────────────────────────────────
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog",
          "/blog/",
          "/mock-test",
          "/writing",
          "/speaking",
          "/reading",
          "/listening",
          "/pricing",
          "/demo",
          "/about",
          "/contact",
          "/signup",
          "/login",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/history",
          "/dev",
          "/_next/",
          "/forgot-password",
          "/reset-password",
        ],
      },
      // ── Googlebot — faster crawl, allow JS assets ─────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/history",
          "/dev",
        ],
        crawlDelay: 1,
      },
      // ── Bingbot ───────────────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/history",
          "/dev",
        ],
        crawlDelay: 2,
      },
      // ── Block AI training crawlers (opt-out) ──────────────────────────────
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
