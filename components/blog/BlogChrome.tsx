import Link from "next/link";
import { SOCIALS } from "@/lib/site";
import { DEVLOOM_URL } from "@/lib/jsonld";

export function BlogHeader() {
  return (
    <header className="bh">
      <Link href="/" className="bh__brand">
        Advik Gupta
      </Link>
      <nav className="bh__nav" aria-label="Main">
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="bf">
      <nav className="bf__nav" aria-label="Footer">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <a href="/blog/rss.xml">RSS feed</a>
      </nav>
      <div className="bf__social">
        {SOCIALS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            rel="me noopener noreferrer"
            target="_blank"
          >
            {s.label}
          </a>
        ))}
        <a href={DEVLOOM_URL} rel="noopener noreferrer" target="_blank">
          Devloom
        </a>
      </div>
      <p className="bf__copy">© {new Date().getFullYear()} Advik Gupta</p>
    </footer>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.name}>
            {item.href ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true"> › </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function AuthorBox() {
  return (
    <aside className="author" aria-label="About the author">
      <p className="author__name">Advik Gupta</p>
      <p className="author__bio">
        Full-stack web developer and electronics engineering student at VIT
        Vellore. I build Go backends, Next.js frontends and custom software for
        factories at Devloom.
      </p>
      <p className="author__links">
        <Link href="/contact">Contact me about a project</Link>
        <a href={DEVLOOM_URL} rel="noopener noreferrer" target="_blank">
          Visit Devloom
        </a>
      </p>
    </aside>
  );
}
