import Link from "next/link";
import { CATEGORIES, PAGE_SIZE, pageCount, type PostMeta } from "@/lib/blog";
import { blogIndexGraph } from "@/lib/jsonld";
import JsonLd from "@/components/ui/JsonLd";
import { Breadcrumbs } from "./BlogChrome";
import PostCard from "./PostCard";

export const BLOG_INTRO =
  "Notes on web development, AI-assisted coding, freelancing, and building custom software for factories.";

export const BLOG_DESCRIPTION =
  "Notes on web development, AI-assisted coding, freelancing and building custom software for factories, from full-stack developer Advik Gupta.";

export default function BlogListing({
  all,
  page,
}: {
  all: PostMeta[];
  page: number;
}) {
  const total = pageCount(all.length);
  const posts = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const href = (n: number) => (n === 1 ? "/blog" : `/blog/page/${n}`);

  return (
    <main id="main" className="bl">
      <JsonLd data={blogIndexGraph(posts)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <header className="bl__head">
        <h1 className="bl__title display">Blog</h1>
        <p className="bl__intro">{BLOG_INTRO}</p>
        {page > 1 && (
          <p className="bl__page">
            Page {page} of {total}
          </p>
        )}
      </header>

      <nav className="bl__cats" aria-label="Categories">
        <span className="is-current">All posts</span>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}`}>
            {c.name}
          </Link>
        ))}
      </nav>

      {posts.length > 0 ? (
        <div className="bl__grid">
          {posts.map((p, i) => (
            <PostCard key={p.slug} post={p} priority={page === 1 && i === 0} />
          ))}
        </div>
      ) : (
        <p className="bl__empty">
          The first posts are being written. Check back soon.
        </p>
      )}

      {total > 1 && (
        <nav className="bl__pages" aria-label="Pagination">
          {page > 1 && <a href={href(page - 1)}>← Newer posts</a>}
          {Array.from({ length: total }, (_, i) => i + 1).map((n) =>
            n === page ? (
              <span key={n} aria-current="page">
                {n}
              </span>
            ) : (
              <a key={n} href={href(n)}>
                {n}
              </a>
            ),
          )}
          {page < total && <a href={href(page + 1)}>Older posts →</a>}
        </nav>
      )}
    </main>
  );
}
