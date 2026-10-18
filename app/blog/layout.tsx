import { BlogFooter, BlogHeader } from "@/components/blog/BlogChrome";
import "@/components/blog/blog.css";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="blog">
      <BlogHeader />
      {children}
      <BlogFooter />
    </div>
  );
}
