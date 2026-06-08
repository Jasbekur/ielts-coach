import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const BASE_URL = "https://ieltssensei.uz";

// ── Lightweight admin Supabase client (no cookies — safe in sitemap route) ───
function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ── Static pages ──────────────────────────────────────────────────────────────
const STATIC_PAGES: MetadataRoute.Sitemap = [
  // Tier 1 — homepage
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  // Tier 2 — blog index
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  // Tier 3 — practice & commercial pages
  {
    url: `${BASE_URL}/mock-test`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/writing`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/speaking`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/reading`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/listening`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/pricing`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  // Tier 4 — informational
  {
    url: `${BASE_URL}/demo`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  // Tier 5 — auth (crawlable but minimal SEO value)
  {
    url: `${BASE_URL}/signup`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/login`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

// ── Source 1: filesystem blog posts (public/blog/*.md) ───────────────────────
// Read slugs directly with fs — avoids importing the heavy lib/blog chain
// (gray-matter, remark, rehype-*, reading-time) which errors in sitemap context.
function filesystemBlogRoutes(): MetadataRoute.Sitemap {
  try {
    const dir = path.join(process.cwd(), "public", "blog");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const slug = f.replace(/\.md$/, "");
        const filePath = path.join(dir, f);
        const stat = fs.statSync(filePath);
        return {
          url: `${BASE_URL}/blog/${slug}`,
          lastModified: stat.mtime,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        };
      });
  } catch {
    return [];
  }
}

// ── Source 2: Supabase "posts" table (DB-backed posts, if used) ───────────────
// Falls back to [] silently if the table doesn't exist or DB is unreachable.
async function fetchSupabasePosts(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = adminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false });

    if (error || !data?.length) return [];

    return data.map((post: { slug: string; updated_at: string | null }) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

// ── Source 3: Supabase "cities" table (local SEO landing pages) ───────────────
// Falls back to [] silently if the table doesn't exist or DB is unreachable.
async function fetchCityPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = adminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("cities")
      .select("slug, updated_at");

    if (error || !data?.length) return [];

    return data.map((city: { slug: string; updated_at: string | null }) => ({
      url: `${BASE_URL}/ielts-${city.slug}-uzbekistan`,
      lastModified: city.updated_at ? new Date(city.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

// ── Deduplicate by URL (filesystem + DB may overlap) ─────────────────────────
function dedupe(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

// ── Main export (async — required for Supabase fetches) ───────────────────────
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dbPosts, cityPages] = await Promise.all([
    fetchSupabasePosts(),
    fetchCityPages(),
  ]);

  const fsPosts = filesystemBlogRoutes();

  return dedupe([
    ...STATIC_PAGES,  // static routes first (highest priority)
    ...fsPosts,        // filesystem posts (always present in build)
    ...dbPosts,        // Supabase posts (deduplicated against filesystem)
    ...cityPages,      // city landing pages
  ]);
}
