import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBox, Breadcrumbs } from "@/components/blog/BlogChrome";
import PostCard from "@/components/blog/PostCard";
import JsonLd from "@/components/ui/JsonLd";
import {
  formatDate,
  getAllPosts,
  getCategory,
  getPost,
  relatedPosts,
} from "@/lib/blog";
import { blogPostingGraph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle,
    absoluteTitle: true,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    imageAlt: post.coverAlt,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const related = relatedPosts(post, getAllPosts());
  const showToc = post.headings.length >= 5;
  const updated = post.updated && post.updated !== post.date;

  return (
    <main id="main" className="post">
      <JsonLd data={blogPostingGraph(post)} />
      <article className="post__article">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />

        <header className="post__head">
          {category && (
            <Link
              href={`/blog/category/${category.slug}`}
              className="post__cat"
            >
              {category.name}
            </Link>
          )}
          <h1 className="post__title display">{post.title}</h1>
          <p className="post__byline">
            By <Link href="/">Advik Gupta</Link>
            <span aria-hidden="true"> · </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {updated && (
              <>
                <span aria-hidden="true"> · </span>
                Updated{" "}
                <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            )}
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
            {post.draft && <span className="post__draft">Draft</span>}
          </p>
        </header>

        <figure className="post__cover">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            width={1200}
            height={630}
            sizes="(max-width: 900px) 100vw, 960px"
            priority
          />
        </figure>

        <div className={`post__layout ${showToc ? "has-toc" : ""}`}>
          {showToc && (
            <nav className="post__toc" aria-label="Table of contents">
              <p className="post__toc-label">On this page</p>
              <ol>
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>

        <footer className="post__foot">
          <p className="post__tags">
            <span>Tags:</span> {post.tags.join(", ")}
          </p>
          <AuthorBox />
        </footer>
      </article>

      {related.length > 0 && (
        <section className="post__related" aria-labelledby="related-title">
          <h2 id="related-title" className="post__related-title display">
            Related posts
          </h2>
          <div className="bl__grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
