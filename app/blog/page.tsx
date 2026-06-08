import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { generateMetadata as gm } from "@/lib/metadata";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "IELTS Blog — Free Tips & Strategies",
  description: "Free IELTS guides by experts. Band 7+ strategies for Writing, Speaking, Listening & Reading. New posts every week.",
  alternates: { canonical: "https://ieltssensei.uz/blog" },
  openGraph: {
    title: "IELTS Blog — Free Tips & Strategies | IELTS Sensei",
    description: "Free IELTS guides by experts. Band 7+ strategies for all four skills.",
    url: "https://ieltssensei.uz/blog",
    siteName: "IELTS Sensei",
    type: "website",
    images: [{ url: "https://ieltssensei.uz/og-image.png", width: 1200, height: 630, alt: "IELTS Sensei Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Blog — Free Tips & Strategies | IELTS Sensei",
    description: "Free IELTS guides by experts. Band 7+ strategies for all four skills.",
    images: ["https://ieltssensei.uz/og-image.png"],
    creator: "@ieltssensei",
  },
};

export default function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  const allPosts = getAllPosts();
  const activeTag = searchParams.tag;
  const posts = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts;

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-red-600 font-bold text-lg">IELTS Sensei</Link>
          <Link href="/signup" className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Start free →
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">IELTS Blog</h1>
          <p className="text-gray-500 text-lg">Expert guides to help you reach your target band score.</p>
        </header>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className={`text-sm px-3 py-1.5 rounded-full transition-colors ${!activeTag ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${activeTag === tag ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Post grid */}
        {posts.length === 0 ? (
          <p className="text-gray-400 py-12 text-center">No posts found for this tag.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 hover:shadow-md transition-all"
              >
                {post.image && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.image_alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.reading_time}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Stop reading — start practising</h2>
          <p className="text-gray-500 mb-5">Get real AI feedback on your IELTS Writing and Speaking. Free to start.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">
            Practice free now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
