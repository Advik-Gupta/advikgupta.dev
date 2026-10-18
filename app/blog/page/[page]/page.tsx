import { notFound } from "next/navigation";
import BlogListing from "@/components/blog/BlogListing";
import { getAllPosts, pageCount } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const total = pageCount(getAllPosts().length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Params) {
  const { page } = await params;
  return pageMetadata({
    title: `Blog – Page ${page}`,
    description: `Page ${page} of notes on web development, AI-assisted coding, freelancing and custom software for factories by Advik Gupta.`,
    path: `/blog/page/${page}`,
  });
}

export default async function Page({ params }: Params) {
  const { page } = await params;
  const n = Number(page);
  const all = getAllPosts();
  if (!Number.isInteger(n) || n < 2 || n > pageCount(all.length)) notFound();
  return <BlogListing all={all} page={n} />;
}
