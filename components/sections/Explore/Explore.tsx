import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import "./Explore.css";

const TILES = [
  {
    href: "/freebies",
    label: "Freebies",
    note: "Components from this site, free to copy",
    tone: "accent",
  },
  {
    href: "/projects",
    label: "Projects",
    note: "Everything I've built, in one place",
    tone: "ink",
  },
  {
    href: "/hackathons",
    label: "Hackathons",
    note: "Weekends spent shipping fast",
    tone: "soft",
  },
  {
    href: "/blog",
    label: "Blog",
    note: "Notes on building things",
    tone: "outline",
  },
];

export default function Explore() {
  return (
    <section className="explore" aria-label="Explore more">
      <p className="explore__lead">Keep exploring</p>
      <ul className="explore__grid">
        {TILES.map((t, i) => (
          <li
            key={t.href}
            className={
              t.href === "/freebies" ? "explore__item--desktop" : undefined
            }
          >
            <Link
              href={t.href}
              className={`explore__tile explore__tile--${t.tone}`}
              data-cursor="grow"
            >
              <span className="explore__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="explore__label display">{t.label}</span>
              <span className="explore__note">{t.note}</span>
              <span className="explore__icon">
                <ArrowIcon />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
