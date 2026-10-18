import { SOCIALS } from "./site";
import { SITE_NAME, SITE_URL, absolute } from "./seo";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEVLOOM_URL = "https://devloom.in";
export const DEVLOOM_ID = `${DEVLOOM_URL}/#organization`;

type Crumb = { name: string; path?: string };

export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: absolute(c.path) } : {}),
    })),
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        image: absolute("/assets/advik.jpeg"),
        jobTitle: "Freelance Full-Stack Web Developer",
        worksFor: { "@id": DEVLOOM_ID },
        knowsAbout: [
          "Web development",
          "Next.js",
          "React",
          "Custom manufacturing software",
          "AI-assisted development",
        ],
        sameAs: [...SOCIALS.map((s) => s.href), DEVLOOM_URL],
      },
      {
        "@type": "Organization",
        "@id": DEVLOOM_ID,
        name: "Devloom",
        url: DEVLOOM_URL,
        founder: { "@id": PERSON_ID },
      },
    ],
  };
}

export function blogPostingGraph(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  coverImage: string;
}) {
  const url = absolute(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        image: [absolute(post.coverImage)],
        datePublished: post.date,
        dateModified: post.updated,
        author: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
        publisher: { "@id": PERSON_ID },
        mainEntityOfPage: url,
        inLanguage: "en",
      },
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title },
      ]),
    ],
  };
}

export function blogIndexGraph(
  posts: { slug: string; title: string; date: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: absolute("/blog"),
        name: "Advik Gupta – Blog",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: absolute(`/blog/${p.slug}`),
          datePublished: p.date,
        })),
      },
      breadcrumbList([{ name: "Home", path: "/" }, { name: "Blog" }]),
    ],
  };
}

export function collectionGraph(category: {
  slug: string;
  name: string;
  description: string;
}) {
  const path = `/blog/category/${category.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absolute(path)}#collection`,
        url: absolute(path),
        name: category.name,
        description: category.description,
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
      },
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: category.name },
      ]),
    ],
  };
}
