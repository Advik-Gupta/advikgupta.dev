import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export type Category = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "ai-and-development",
    name: "AI and development",
    title: "AI and Software Development",
    description:
      "How AI tools are changing the way software gets built: what got faster, what got riskier, and how to learn and hire well in the age of AI-assisted coding.",
    intro:
      "Notes from using AI coding tools every day on real client and factory projects: where they save hours, where they quietly break things, and what that means for developers and the people who hire them.",
  },
  {
    slug: "manufacturing-software",
    name: "Manufacturing software",
    title: "Custom Software for Manufacturing",
    description:
      "Custom software for factories: traceability, inspection records, production tracking and when it beats an ERP for small and mid-sized manufacturers.",
    intro:
      "What it takes to build software that runs on a factory floor, from paper registers and spreadsheets to traceability systems that hold up in an audit.",
  },
  {
    slug: "freelancing",
    name: "Freelancing",
    title: "Freelance Web Development",
    description:
      "Stories and practical lessons from freelancing as a web developer: first clients, international work, pricing, scoping and what I wish I had known earlier.",
    intro:
      "What I have learned from freelancing since I was a teenager: getting the first clients, working across borders, and keeping projects calm for everyone involved.",
  },
];

export type PostMeta = {
  title: string;
  seoTitle: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  coverImage: string;
  coverAlt: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
  headings: { id: string; text: string }[];
};

export const PAGE_SIZE = 12;

const DIR = path.join(process.cwd(), "content", "blog");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

function readFile(file: string) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta = {
    ...(data as Omit<PostMeta, "readingMinutes">),
    readingMinutes: Math.max(1, Math.ceil(words / 220)),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readFile(f).meta)
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify);

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  const { meta, content } = readFile(file);
  if (meta.draft && !SHOW_DRAFTS) return null;
  const html = String(processor.processSync(content));
  const headings = Array.from(
    html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g),
  ).map((m) => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") }));
  return { ...meta, html, headings };
}

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

export function relatedPosts(post: PostMeta, all: PostMeta[], limit = 3) {
  const others = all.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

export function pageCount(total: number) {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}
