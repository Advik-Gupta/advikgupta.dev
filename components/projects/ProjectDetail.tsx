"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import type { Project } from "./data";
import "./ProjectDetail.css";

type Props = {
  project: Project;
  index: number;
  next: Project;
  primary: boolean;
  onNext: (project: Project) => void;
  origin: DOMRect | null;
  closing: boolean;
  onRequestClose: () => void;
  onClosed: () => void;
};

const clipFrom = (r: DOMRect) =>
  `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round 18px)`;

export default function ProjectDetail({
  project,
  index,
  next,
  primary,
  onNext,
  origin,
  closing,
  onRequestClose,
  onClosed,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const done = useRef(onClosed);

  useEffect(() => {
    done.current = onClosed;
  });

  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onRequestClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onRequestClose]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      scroller.current?.scrollTo(0, 0);

      if (reduce) {
        gsap.set(el, { opacity: 1, clipPath: "none", yPercent: 0 });
        return;
      }

      const tl = gsap.timeline();
      if (mobile) {
        tl.fromTo(
          el,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.7, ease: "expo.out" },
        );
      } else if (origin) {
        tl.fromTo(
          el,
          { clipPath: clipFrom(origin) },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            duration: 1,
            ease: "expo.inOut",
          },
        );
      } else {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" },
        );
      }

      tl.from(
        ".pd__word-in",
        { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06 },
        mobile ? 0.2 : 0.55,
      ).from(
        ".pd-reveal",
        { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.06 },
        mobile ? 0.3 : 0.7,
      );

      if (!mobile) {
        const box = scroller.current;
        const cover = el.querySelector<HTMLElement>(".pd__cover-img");
        const onScroll = () => {
          if (box && cover)
            cover.style.transform = `translate3d(0, ${box.scrollTop * 0.12}px, 0) scale(1.08)`;
        };
        box?.addEventListener("scroll", onScroll, { passive: true });
        return () => box?.removeEventListener("scroll", onScroll);
      }
    },
    { scope: root },
  );

  useEffect(() => {
    if (!closing) return;
    const el = root.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      done.current();
      return;
    }
    const tween = mobile
      ? gsap.to(el, { yPercent: 100, duration: 0.55, ease: "expo.in" })
      : origin
        ? gsap
            .timeline()
            .to(el.querySelectorAll(".pd__inner"), {
              opacity: 0,
              duration: 0.25,
            })
            .to(el, {
              clipPath: clipFrom(origin),
              duration: 0.8,
              ease: "expo.inOut",
            })
        : gsap.to(el, {
            opacity: 0,
            scale: 0.97,
            duration: 0.45,
            ease: "power2.in",
          });
    tween.eventCallback("onComplete", () => done.current());
    return () => {
      tween.kill();
    };
  }, [closing, origin]);

  const words = project.title.split(" ");
  const Title = primary ? "h1" : "h2";
  const Label = primary ? "h2" : "h3";

  return (
    <div
      className="pd"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="pd__scroll" ref={scroller} data-lenis-prevent>
        <article className="pd__inner">
          <header className="pd__bar">
            <span className="pd__crumb">
              Projects <span>/</span> {String(index + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="pd__close"
              onClick={onRequestClose}
              data-cursor="grow"
            >
              <span className="pd__close-label">Close</span>
              <span className="pd__close-x" aria-hidden="true">
                ×
              </span>
            </button>
          </header>

          <section className="pd__hero">
            <p className="pd__eyebrow pd-reveal">
              {project.year} · {project.category}
            </p>
            <Title className="pd__title display">
              {words.map((w, i) => (
                <span key={i} className="pd__word">
                  <span className="pd__word-in">{w}</span>
                </span>
              ))}
            </Title>
            <p className="pd__hook pd-reveal">{project.hook}</p>

            <dl className="pd__meta pd-reveal">
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(", ")}</dd>
              </div>
              <div>
                <dt>Links</dt>
                <dd className="pd__links">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="grow"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </section>

          <figure className="pd__cover pd-reveal">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(max-width: 760px) 100vw, 90vw"
              className="pd__cover-img"
              priority
            />
          </figure>

          <section className="pd__block pd-reveal">
            <Label className="pd__label">Overview</Label>
            <div className="pd__prose">
              {project.overview.map((para, i) => (
                <p key={i} className={i === 0 ? "pd__lead" : "pd__body"}>
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section className="pd__stats pd-reveal" aria-label="Key numbers">
            {project.stats.map((s) => (
              <div key={s.label} className="pd__stat">
                <span className="pd__stat-value display">{s.value}</span>
                <span className="pd__stat-label">{s.label}</span>
              </div>
            ))}
          </section>

          <section className="pd__block pd-reveal">
            <Label className="pd__label">{project.contributionTitle}</Label>
            <ol className="pd__list">
              {project.contribution.map((c, i) => (
                <li key={i}>
                  <span className="pd__list-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{c}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="pd__gallery-wrap pd-reveal">
            <Label className="pd__label">Gallery</Label>
            <div className="pd__gallery">
              {project.gallery.map((g) => (
                <figure key={g.src} className={`pd__shot pd__shot--${g.shape}`}>
                  <div className="pd__frame">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes={
                        g.shape === "full"
                          ? "(max-width: 760px) 80vw, 90vw"
                          : "(max-width: 760px) 80vw, 45vw"
                      }
                    />
                  </div>
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {project.challenges && (
            <section className="pd__block pd-reveal">
              <Label className="pd__label">Challenges</Label>
              <div className="pd__prose">
                {project.challenges.map((para, i) => (
                  <p key={i} className="pd__body">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          <footer className="pd__next pd-reveal">
            <span className="pd__next-label">Next project</span>
            <a
              href={`/projects/${next.slug}`}
              className="pd__next-title display"
              onClick={(e) => {
                e.preventDefault();
                onNext(next);
              }}
              data-cursor="grow"
            >
              {next.title} →
            </a>
            <button
              type="button"
              className="pd__back"
              onClick={onRequestClose}
              data-cursor="grow"
            >
              ← All projects
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
