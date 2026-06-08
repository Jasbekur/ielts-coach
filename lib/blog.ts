import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "public", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  published_at: string;
  updated_at?: string;
  author: string;
  author_title?: string;
  tags: string[];
  image?: string;
  image_alt?: string;
  reading_time: string;
  word_count: number;
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

function parsePost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    content,
    published_at: data.published_at || new Date().toISOString(),
    updated_at: data.updated_at,
    author: data.author || "IELTS Sensei",
    author_title: data.author_title || "IELTS Expert",
    tags: data.tags || [],
    image: data.image,
    image_alt: data.image_alt,
    reading_time: stats.text,
    word_count: stats.words,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const post = parsePost(slug);
      if (!post) return null;
      const { content, ...meta } = post;
      return meta;
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.published_at).getTime() - new Date(a!.published_at).getTime()
    ) as BlogPostMeta[];
}

export function getPostBySlug(slug: string): BlogPost | null {
  return parsePost(slug);
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return result.toString();
}

export function getRelatedPosts(current: BlogPostMeta, all: BlogPostMeta[], limit = 3): BlogPostMeta[] {
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
