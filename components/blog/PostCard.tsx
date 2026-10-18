import Image from "next/image";
import Link from "next/link";
import { formatDate, getCategory, type PostMeta } from "@/lib/blog";

type Props = {
  post: PostMeta;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
};

export default function PostCard({
  post,
  priority = false,
  headingLevel = "h2",
}: Props) {
  const Heading = headingLevel;
  const category = getCategory(post.category);
  return (
    <article className="card">
      <Link href={`/blog/${post.slug}`} className="card__link">
        <span className="card__media">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            width={1200}
            height={630}
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 31vw"
            priority={priority}
          />
        </span>
        <span className="card__meta">
          {category?.name}
          <span aria-hidden="true"> · </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.readingMinutes} min read
          {post.draft && <span className="card__draft">Draft</span>}
        </span>
        <Heading className="card__title">{post.title}</Heading>
        <span className="card__desc">{post.description}</span>
      </Link>
    </article>
  );
}
