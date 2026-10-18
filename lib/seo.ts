export const SITE_URL = "https://www.advikgupta.dev";
export const SITE_NAME = "Advik Gupta";
export const DEFAULT_TITLE = "Advik Gupta – Freelance Full-Stack Web Developer";
export const DEFAULT_DESCRIPTION =
  "Advik Gupta is a full-stack web developer and VIT Vellore student building Go backends, Next.js frontends and software that holds up when real people show up.";
export const DEFAULT_OG_IMAGE = "/og.webp";

export const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime: string; tags?: string[] };
};

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
  absoluteTitle = false,
  article,
}: PageMeta) {
  const url = absolute(path);
  const images = [
    { url: absolute(image), width: 1200, height: 630, alt: imageAlt },
  ];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": [
          { url: "/blog/rss.xml", title: "Advik Gupta – Blog" },
        ],
      },
    },
    openGraph: article
      ? {
          type: "article" as const,
          url,
          title,
          description,
          siteName: SITE_NAME,
          locale: "en_US",
          images,
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: [SITE_URL],
          tags: article.tags,
        }
      : {
          type: "website" as const,
          url,
          title,
          description,
          siteName: SITE_NAME,
          locale: "en_US",
          images,
        },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [absolute(image)],
    },
  };
}
