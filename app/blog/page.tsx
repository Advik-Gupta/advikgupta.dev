import BlogListing, { BLOG_DESCRIPTION } from "@/components/blog/BlogListing";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: BLOG_DESCRIPTION,
  path: "/blog",
});

export default function Page() {
  return <BlogListing all={getAllPosts()} page={1} />;
}
