import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts, pageCount } from "@/lib/blog";
import { PROJECTS } from "@/components/projects/data";
import { absolute } from "@/lib/seo";

const STATIC_PAGES: { path: string; lastModified: string }[] = [
  { path: "/", lastModified: "2026-10-18" },
  { path: "/projects", lastModified: "2026-10-19" },
  { path: "/contact", lastModified: "2026-10-18" },
  { path: "/freebies", lastModified: "2026-10-18" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((p) => !p.draft);
  const latest = (list: typeof posts) =>
    list
      .map((p) => p.updated || p.date)
      .sort()
      .at(-1);

  const blogPages = Array.from({ length: pageCount(posts.length) }, (_, i) => ({
    url: absolute(i === 0 ? "/blog" : `/blog/page/${i + 1}`),
    lastModified: latest(posts) ?? "2026-10-18",
  }));

  const categories = CATEGORIES.map((c) => {
    const inCategory = posts.filter((p) => p.category === c.slug);
    return inCategory.length
      ? {
          url: absolute(`/blog/category/${c.slug}`),
          lastModified: latest(inCategory),
        }
      : null;
  }).filter((c): c is { url: string; lastModified: string } => c !== null);

  return [
    ...STATIC_PAGES.map((p) => ({
      url: absolute(p.path),
      lastModified: p.lastModified,
    })),
    ...PROJECTS.map((p) => ({
      url: absolute(`/projects/${p.slug}`),
      lastModified: "2026-10-19",
    })),
    ...blogPages,
    ...categories,
    ...posts.map((p) => ({
      url: absolute(`/blog/${p.slug}`),
      lastModified: p.updated || p.date,
    })),
  ];
}
