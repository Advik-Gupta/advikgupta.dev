import type { Metadata } from "next";
import Link from "next/link";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main id="main" className="lost">
      <div className="lost__body">
        <span className="lost__badge">Error 404</span>
        <h1 className="lost__title display">
          Wrong <span className="hl">exit</span>
        </h1>
        <p className="lost__line">
          This road doesn&apos;t go anywhere. The page you&apos;re looking for
          was moved, renamed, or never existed in the first place.
        </p>
        <div className="lost__actions">
          <Link href="/" className="lost__cta" data-cursor="grow">
            Take me home
          </Link>
          <Link
            href="/blog"
            className="lost__ghost link-line"
            data-cursor="grow"
          >
            Read the blog
          </Link>
          <Link
            href="/contact"
            className="lost__ghost link-line"
            data-cursor="grow"
          >
            Contact me
          </Link>
        </div>
      </div>

      <div className="lost__scene" aria-hidden="true">
        <span className="lost__num display">404</span>
        <div className="lost__road">
          <span className="lost__lines" />
          <div className="lost__car">
            <svg viewBox="-16 -10 32 20">
              <rect x="-9" y="-8" width="4.5" height="2.5" rx="1" fill="#111" />
              <rect x="4" y="-8" width="4.5" height="2.5" rx="1" fill="#111" />
              <rect
                x="-9"
                y="5.5"
                width="4.5"
                height="2.5"
                rx="1"
                fill="#111"
              />
              <rect x="4" y="5.5" width="4.5" height="2.5" rx="1" fill="#111" />
              <rect
                x="-11"
                y="-6.5"
                width="22"
                height="13"
                rx="5"
                fill="#ff7a2c"
              />
              <rect
                x="2"
                y="-4.8"
                width="5"
                height="9.6"
                rx="1.5"
                fill="#111"
              />
              <circle cx="10.5" cy="-3.5" r="1.1" fill="#fff3c4" />
              <circle cx="10.5" cy="3.5" r="1.1" fill="#fff3c4" />
            </svg>
          </div>
          <span className="lost__bonk">!</span>
          <div className="lost__barrier">
            <span className="lost__sign">Dead end</span>
          </div>
        </div>
      </div>
    </main>
  );
}
