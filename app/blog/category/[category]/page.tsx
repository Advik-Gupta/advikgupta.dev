import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/BlogChrome";
import PostCard from "@/components/blog/PostCard";
import JsonLd from "@/components/ui/JsonLd";
import { CATEGORIES, getAllPosts, getCategory } from "@/lib/blog";
import { collectionGraph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: c.description,
    path: `/blog/category/${c.slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const posts = getAllPosts().filter((p) => p.category === c.slug);

  return (
    <main id="main" className="bl">
      <JsonLd
        data={collectionGraph({
          slug: c.slug,
          name: c.title,
          description: c.description,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: c.name },
        ]}
      />

      <header className="bl__head">
        <h1 className="bl__title bl__title--cat display">{c.title}</h1>
        <p className="bl__intro">{c.intro}</p>
      </header>

      <nav className="bl__cats" aria-label="Categories">
        <Link href="/blog">All posts</Link>
        {CATEGORIES.map((x) =>
          x.slug === c.slug ? (
            <span key={x.slug} className="is-current">
              {x.name}
            </span>
          ) : (
            <Link key={x.slug} href={`/blog/category/${x.slug}`}>
              {x.name}
            </Link>
          ),
        )}
      </nav>

      {posts.length > 0 ? (
        <div className="bl__grid">
          {posts.map((p, i) => (
            <PostCard key={p.slug} post={p} priority={i === 0} />
          ))}
        </div>
      ) : (
        <p className="bl__empty">
          No posts in this category yet. Check back soon.
        </p>
      )}
    </main>
  );
}
