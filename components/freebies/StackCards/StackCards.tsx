"use client";

import { RefObject, useEffect, useRef } from "react";
import "./StackCards.css";

export type Card = {
  title: string;
  text: string;
  year?: string;
  hook?: string;
  tags?: string[];
  link?: { label: string; href: string };
  tone?: "ink" | "accent" | "soft";
};

type Props = {
  cards: Card[];
  scroller?: RefObject<HTMLElement | null>;
  cardHeight?: string;
  top?: number;
};

export default function StackCards({
  cards,
  scroller,
  cardHeight = "80vh",
  top = 24,
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".sc-card"));
    const inners = items.map((c) =>
      c.querySelector<HTMLElement>(".sc-card__inner"),
    );
    const shades = items.map((c) =>
      c.querySelector<HTMLElement>(".sc-card__shade"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = scroller?.current;
      const viewTop = box ? box.getBoundingClientRect().top : 0;
      const viewH = box ? box.clientHeight : window.innerHeight;
      items.forEach((_, i) => {
        const next = items[i + 1];
        if (!next) return;
        const nextTop = next.getBoundingClientRect().top - viewTop;
        const p = Math.min(1, Math.max(0, (viewH - nextTop) / (viewH - top)));
        const inner = inners[i];
        const shade = shades[i];
        if (inner) inner.style.transform = `scale(${1 - p * 0.1})`;
        if (shade) shade.style.opacity = String(p * 0.45);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const target: HTMLElement | Window = scroller?.current ?? window;
    target.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [cards, scroller, top]);

  return (
    <div className="sc" ref={root}>
      {cards.map((c, i) => (
        <article
          key={c.title}
          className={`sc-card sc-card--${c.tone ?? "ink"}`}
          style={{ zIndex: i + 1, top, height: cardHeight }}
        >
          <div className="sc-card__inner">
            <div className="sc-card__top">
              <span>
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(cards.length).padStart(2, "0")}
              </span>
              {c.year && <span>{c.year}</span>}
            </div>
            <div>
              <h3 className="sc-card__title">{c.title}</h3>
              {c.hook && <p className="sc-card__hook">{c.hook}</p>}
            </div>
            <div className="sc-card__foot">
              <p className="sc-card__text">{c.text}</p>
              <div className="sc-card__meta">
                {c.tags && (
                  <ul className="sc-card__tags">
                    {c.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {c.link && (
                  <a
                    className="sc-card__link"
                    href={c.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.link.label} ↗
                  </a>
                )}
              </div>
            </div>
            <span className="sc-card__shade" aria-hidden="true" />
          </div>
        </article>
      ))}
    </div>
  );
}
