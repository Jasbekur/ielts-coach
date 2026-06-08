import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { getAllPosts, getPostBySlug, getRelatedPosts, renderMarkdown } from "@/lib/blog";
import { ArticleSchema, BreadcrumbSchema } from "@/components/shared/StructuredData";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";

const BASE_URL = "https://ieltssensei.uz";

// ── Supabase admin client (no cookies — safe in Server Component / generateMetadata) ──
function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ── Shape returned from Supabase "posts" table ───────────────────────────────
interface SupabasePost {
  slug:             string;
  title:            string;
  description:      string | null;
  content:          string | null;
  created_at:       string | null;
  updated_at:       string | null;
  cover_image_url:  string | null;
  author:           string | null;
  tags?:            string[] | null;
  section?:         string | null;
}

// ── Fetch a single post from Supabase by slug ────────────────────────────────
async function fetchSupabasePost(slug: string): Promise<SupabasePost | null> {
  try {
    const supabase = adminClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("posts")
      .select("slug, title, description, content, created_at, updated_at, cover_image_url, author, tags, section")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data as SupabasePost;
  } catch {
    return null;
  }
}

// ── Pre-render all published slugs at build time ─────────────────────────────
export async function generateStaticParams() {
  // Primary: Supabase "posts" table (DB-backed posts)
  let dbSlugs: { slug: string }[] = [];
  try {
    const supabase = adminClient();
    if (supabase) {
      const { data } = await supabase
        .from("posts")
        .select("slug")
        .eq("status", "published");
      if (data?.length) dbSlugs = data.map((r: { slug: string }) => ({ slug: r.slug }));
    }
  } catch { /* fallback below */ }

  // Fallback: filesystem blog posts (public/blog/*.md)
  const fsSlugs = getAllPosts().map((p) => ({ slug: p.slug }));

  // Merge — deduplicate by slug
  const seen = new Set<string>();
  return [...dbSlugs, ...fsSlugs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

// ── Per-post metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 1. Try Supabase first (DB-backed posts)
  const dbPost = await fetchSupabasePost(slug);

  // 2. Fallback to filesystem (markdown posts)
  const fsPost = dbPost ? null : getPostBySlug(slug);

  // 3. If neither source has it → Next.js 404
  if (!dbPost && !fsPost) {
    return {
      title: "Post Not Found | IELTS Sensei",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${BASE_URL}/blog/${slug}`;

  // ── Normalise fields across both sources ────────────────────────────────────
  const title       = dbPost?.title            ?? fsPost!.title;
  const rawDesc     = dbPost?.description      ?? fsPost!.description ?? "";
  const publishedAt = dbPost?.created_at       ?? fsPost!.published_at;
  const updatedAt   = dbPost?.updated_at       ?? fsPost!.updated_at ?? publishedAt;
  const author      = dbPost?.author           ?? fsPost!.author;
  const tags        = dbPost?.tags             ?? fsPost!.tags ?? [];
  const section     = dbPost?.section          ?? "IELTS Preparation";
  const coverImage  = dbPost?.cover_image_url  ?? fsPost!.image ?? null;

  // ── SEO-safe truncation ─────────────────────────────────────────────────────
  const seoTitle = title.length > 60
    ? title.slice(0, 57) + "..."
    : title;

  const seoDesc = rawDesc.length > 155
    ? rawDesc.slice(0, 152) + "..."
    : rawDesc;

  // ── OG image: post cover → fallback to /og-default.jpg ─────────────────────
  const ogImageUrl = coverImage
    ? coverImage                      // absolute URL from Supabase Storage
    : `${BASE_URL}/og-default.jpg`;   // static fallback

  return {
    // ── Core ───────────────────────────────────────────────────────────────────
    title:       `${seoTitle} | IELTS Sensei`,
    description: seoDesc,
    keywords:    ["IELTS Sensei", "IELTS preparation Uzbekistan", ...tags],
    authors:     [{ name: author ?? "IELTS Sensei" }],

    // ── Canonical ──────────────────────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
    },

    // ── OpenGraph (article) ────────────────────────────────────────────────────
    openGraph: {
      title:         `${seoTitle} | IELTS Sensei`,
      description:   seoDesc,
      url:           canonicalUrl,
      siteName:      "IELTS Sensei",
      type:          "article",
      publishedTime: publishedAt  ?? undefined,
      modifiedTime:  updatedAt    ?? undefined,
      authors:       author ? [author] : ["IELTS Sensei"],
      section:       section,
      tags:          tags,
      images: [
        {
          url:    ogImageUrl,
          width:  1200,
          height: 630,
          alt:    seoTitle,
        },
      ],
    },

    // ── Twitter card ───────────────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      title:       `${seoTitle} | IELTS Sensei`,
      description: seoDesc,
      images:      [ogImageUrl],
      site:        "@ieltssensei",
    },

    // ── Robots ─────────────────────────────────────────────────────────────────
    robots: {
      index:  true,
      follow: true,
      "max-image-preview": "large",
      googleBot: {
        index:               true,
        follow:              true,
        "max-image-preview": "large",
        "max-snippet":       -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = getRelatedPosts(post, allPosts);
  const html = await renderMarkdown(post.content);
  const url = `${BASE_URL}/blog/${slug}`;

  const publishedDate = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        url={url}
        datePublished={post.published_at}
        dateModified={post.updated_at || post.published_at}
        image={post.image}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url },
        ]}
      />

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-100 px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-red-600 font-bold text-lg">
              IELTS Sensei
            </Link>
            <Link href="/blog" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 text-xs font-medium bg-red-50 text-red-700 px-2.5 py-1 rounded-full hover:bg-red-100 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                {post.author[0]}
              </div>
              <div>
                <span className="font-medium text-gray-700">{post.author}</span>
                {post.author_title && <span className="text-gray-400"> · {post.author_title}</span>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.published_at}>{publishedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.reading_time}
            </div>
          </div>

          {/* Hero image */}
          {post.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.image_alt || post.title}
                className="w-full h-64 sm:h-80 object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-li:my-1
              prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-red-700 prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to boost your IELTS band?</h2>
            <p className="text-red-100 mb-6">Get AI feedback on your Writing and Speaking — free to start, no credit card needed.</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors"
            >
              Start free practice
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 pb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block border border-gray-100 rounded-xl p-4 hover:border-red-200 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">{p.reading_time}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
