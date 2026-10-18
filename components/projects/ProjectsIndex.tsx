"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "./data";
import ProjectDetail from "./ProjectDetail";
import "./Projects.css";

type Props = {
  projects: Project[];
  upcoming: number;
};

type Open = { project: Project; index: number; origin: DOMRect | null };

export default function ProjectsIndex({ projects, upcoming }: Props) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Open | null>(null);
  const [closing, setClosing] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pj__title-in", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.1,
        });
        gsap.from(".pj__card, .pj__ghost", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.35,
        });
      });
    },
    { scope: root },
  );

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  };

  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const show = useCallback(
    (project: Project, origin: DOMRect | null, push: boolean) => {
      const index = projects.findIndex((p) => p.slug === project.slug);
      setClosing(false);
      setOpen({ project, index, origin });
      if (push)
        window.history.pushState({ p: project.slug }, "", `?p=${project.slug}`);
    },
    [projects],
  );

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("p");
    const match = projects.find((p) => p.slug === slug);
    const frame = requestAnimationFrame(() => {
      if (match) show(match, null, false);
    });

    const onPop = () => {
      const p = new URLSearchParams(window.location.search).get("p");
      const next = projects.find((x) => x.slug === p);
      if (next) show(next, null, false);
      else setClosing(true);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", onPop);
    };
  }, [projects, show]);

  const requestClose = useCallback(() => {
    if (window.history.state?.p) window.history.back();
    else {
      window.history.replaceState(null, "", window.location.pathname);
      setClosing(true);
    }
  }, []);

  const closed = useCallback(() => {
    setOpen(null);
    setClosing(false);
  }, []);

  return (
    <main id="main" className="pj" ref={root}>
      <Link href="/" className="pj__back link-line" data-cursor="grow">
        ← Back home
      </Link>

      <header className="pj__head">
        <h1 className="pj__heading display">
          <span className="pj__mask">
            <span className="pj__title-in">Projects</span>
          </span>
          <sup className="pj__count">
            ({String(projects.length).padStart(2, "0")})
          </sup>
        </h1>
        <p className="pj__intro">
          Things I&apos;ve built, broken and rebuilt. Click one to open it up.
          More are being written up right now.
        </p>
      </header>

      <ul className="pj__grid">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <button
              type="button"
              className="pj__card"
              onClick={(e) =>
                show(p, e.currentTarget.getBoundingClientRect(), true)
              }
              onPointerMove={tilt}
              onPointerLeave={untilt}
              data-cursor="grow"
            >
              <span className="pj__media">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 31vw"
                  />
                ) : (
                  <span className="pj__media-ph">Cover image</span>
                )}
                <span className="pj__year">{p.year}</span>
              </span>
              <span className="pj__body">
                <span className="pj__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pj__name display">
                  <span className="pj__mask">
                    <span className="pj__title-in">{p.title}</span>
                  </span>
                </span>
                <span className="pj__hook">{p.hook}</span>
                <span className="pj__foot">
                  <span className="pj__tags">
                    {p.stack.slice(0, 3).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                  <span className="pj__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
        {Array.from({ length: upcoming }, (_, i) => (
          <li key={`ghost-${i}`} className="pj__ghost" aria-hidden="true">
            <span className="pj__media pj__media--ghost">
              <span className="pj__media-ph">In the works</span>
            </span>
            <span className="pj__body">
              <span className="pj__num">
                {String(projects.length + i + 1).padStart(2, "0")}
              </span>
              <span className="pj__name display">Coming soon</span>
              <span className="pj__hook">Being written up right now.</span>
            </span>
          </li>
        ))}
      </ul>

      {open && (
        <ProjectDetail
          project={open.project}
          index={open.index}
          origin={open.origin}
          closing={closing}
          onRequestClose={requestClose}
          onClosed={closed}
        />
      )}
    </main>
  );
}
