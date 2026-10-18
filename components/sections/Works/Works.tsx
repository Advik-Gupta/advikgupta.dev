"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { PROJECTS } from "./projects";
import "./Works.css";

export default function Works() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");

        cards.forEach((card, i) => {
          const inner = card.querySelector(".work-card__inner");
          const shade = card.querySelector(".work-card__shade");
          const next = cards[i + 1];

          gsap.from(card.querySelectorAll(".work-card__reveal"), {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: card, start: "top 75%" },
          });

          if (!next) return;

          gsap.to(inner, {
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });

          gsap.to(shade, {
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });

        gsap.from(".works__title .works__word", {
          yPercent: 105,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".works__title", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="works" id="work" ref={root}>
      <div className="works__head">
        <h2 className="works__title display" aria-label="Selected work">
          <span className="works__mask">
            <span className="works__word">Selected</span>
          </span>{" "}
          <span className="works__mask">
            <span className="works__word hl">work</span>
          </span>
        </h2>
      </div>

      <div className="works__stack">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className={`work-card work-card--${p.tone}`}
            style={{ zIndex: i + 1, ["--i" as string]: i }}
          >
            <div className="work-card__inner">
              <div className="work-card__top work-card__reveal">
                <span className="work-card__index">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(PROJECTS.length).padStart(2, "0")}
                </span>
                <span className="work-card__year">{p.year}</span>
              </div>

              <div className="work-card__body">
                <h3 className="work-card__title display work-card__reveal">
                  {p.title}
                </h3>
                <p className="work-card__hook work-card__reveal">{p.hook}</p>
              </div>

              <div className="work-card__foot">
                <p className="work-card__story work-card__reveal">{p.story}</p>
                <div className="work-card__meta work-card__reveal">
                  <ul className="work-card__tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {p.links.length > 0 && (
                    <div className="work-card__links">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-card__link"
                          data-cursor="grow"
                        >
                          {l.label}
                          <ArrowIcon className="work-card__link-icon" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span className="work-card__shade" aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
      <div className="works__more">
        <Link
          href="/projects"
          className="works__more-link link-line"
          data-cursor="grow"
        >
          See all projects →
        </Link>
      </div>
    </section>
  );
}
