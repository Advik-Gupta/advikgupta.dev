import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import Link from "next/link";
import { FREEBIES } from "@/components/freebies/registry";
import Showcase from "@/components/freebies/Showcase/Showcase";
import RoadJourneyExample from "@/components/freebies/RoadJourney/Example";
import PreloaderExample from "@/components/freebies/Preloader/Example";
import WaveGalleryExample from "@/components/freebies/WaveGallery/Example";
import SlotStatsExample from "@/components/freebies/SlotStats/Example";
import StackCardsExample from "@/components/freebies/StackCards/Example";
import { highlight } from "@/lib/highlight";
import "./freebies.css";

export const metadata: Metadata = {
  title: "Freebies · Advik Gupta",
  description:
    "Free React components from advikgupta.dev. Preview them live, copy the code or download the files.",
  alternates: { canonical: "/freebies" },
};

const EXAMPLES: Record<string, React.ComponentType> = {
  "road-journey": RoadJourneyExample,
  preloader: PreloaderExample,
  "wave-gallery": WaveGalleryExample,
  "slot-stats": SlotStatsExample,
  "stack-cards": StackCardsExample,
};

const root = join(process.cwd(), "components", "freebies");

export default function FreebiesPage() {
  const items = FREEBIES.map((f) => ({
    ...f,
    sources: f.files.map((path) => {
      const code = readFileSync(join(root, path), "utf8");
      return { name: basename(path), code, html: highlight(code) };
    }),
  }));

  return (
    <main className="freebies">
      <header className="freebies__hero">
        <Link href="/" className="freebies__back link-line" data-cursor="grow">
          ← Back home
        </Link>
        <h1 className="freebies__title display">
          Free<span className="hl">bies</span>
        </h1>
        <div className="freebies__intro">
          <p>
            Components from this very site, cleaned up so you can use them in
            your own projects. Play with the live preview, copy the code, or
            grab the whole folder as a zip.
          </p>
          <ul className="freebies__index">
            {items.map((f, i) => (
              <li key={f.slug}>
                <a href={`#${f.slug}`} data-cursor="grow">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="freebies__mobile">
        <span className="freebies__mobile-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="13" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </span>
        <p className="freebies__mobile-title display">
          Best on a bigger screen
        </p>
        <p className="freebies__mobile-text">
          These components come with live previews and code you can copy, which
          is a lot to squeeze onto a phone. Open this page on your laptop or
          desktop to grab them.
        </p>
        <Link href="/" className="freebies__mobile-cta" data-cursor="grow">
          Back to the main site
        </Link>
      </div>

      <div className="freebies__list">
        {items.map((f, i) => {
          const Example = EXAMPLES[f.slug];
          return (
            <Showcase
              key={f.slug}
              index={i}
              slug={f.slug}
              name={f.name}
              blurb={f.blurb}
              deps={f.deps}
              credit={f.credit}
              files={f.sources}
            >
              <Example />
            </Showcase>
          );
        })}
      </div>

      <footer className="freebies__foot">
        <p className="display">More coming soon.</p>
        <Link href="/" className="freebies__home" data-cursor="grow">
          Back to the main site ↗
        </Link>
      </footer>
    </main>
  );
}
