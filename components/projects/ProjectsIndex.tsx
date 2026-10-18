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
  initialSlug?: string;
};

type Open = { project: Project; origin: DOMRect | null };

const slugFromPath = (path: string) =>
  path.match(/^\/projects\/([^/]+)\/?$/)?.[1] ?? null;

export default function ProjectsIndex({ projects, initialSlug }: Props) {
  const root = useRef<HTMLElement>(null);
  const initial = projects.find((p) => p.slug === initialSlug);
  const [open, setOpen] = useState<Open | null>(
    initial ? { project: initial, origin: null } : null,
  );
  const [closing, setClosing] = useState(false);
  const primary = !!initialSlug && open?.project.slug === initialSlug;

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
        gsap.from(".pj__card", {
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
      setClosing(false);
      setOpen({ project, origin });
      if (push) window.history.pushState(null, "", `/projects/${project.slug}`);
    },
    [],
  );

  useEffect(() => {
    const onPop = () => {
      const slug = slugFromPath(window.location.pathname);
      const next = projects.find((p) => p.slug === slug);
      if (next) show(next, null, false);
      else setClosing(true);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [projects, show]);

  const requestClose = useCallback(() => {
    window.history.pushState(null, "", "/projects");
    setClosing(true);
  }, []);

  const closed = useCallback(() => {
    setOpen(null);
    setClosing(false);
  }, []);

  const Heading = open && primary ? "p" : "h1";
  const index = open
    ? projects.findIndex((p) => p.slug === open.project.slug)
    : 0;

  return (
    <main id="main" className="pj" ref={root}>
      <Link href="/" className="pj__back link-line" data-cursor="grow">
        ← Back home
      </Link>

      <header className="pj__head">
        <Heading className="pj__heading display">
          <span className="pj__mask">
            <span className="pj__title-in">Projects</span>
          </span>
          <sup className="pj__count">
            ({String(projects.length).padStart(2, "0")})
          </sup>
        </Heading>
        <p className="pj__intro">
          Things I&apos;ve built: a platform thousands of VIT students rely on
          every exam season, a training app and a hackathon-winning developer
          tool. Open one to see the full story.
        </p>
      </header>

      <ul className="pj__grid">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a
              href={`/projects/${p.slug}`}
              className="pj__card"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                show(p, e.currentTarget.getBoundingClientRect(), true);
              }}
              onPointerMove={tilt}
              onPointerLeave={untilt}
              data-cursor="grow"
            >
              <span className="pj__media">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  fill
                  sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 31vw"
                  priority={i === 0}
                />
                <span className="pj__year">{p.year}</span>
              </span>
              <span className="pj__body">
                <span className="pj__num">
                  {String(i + 1).padStart(2, "0")} · {p.category}
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
            </a>
          </li>
        ))}
      </ul>

      {open && (
        <ProjectDetail
          key={open.project.slug}
          project={open.project}
          index={index}
          next={projects[(index + 1) % projects.length]}
          primary={primary}
          onNext={(p) => show(p, null, true)}
          origin={open.origin}
          closing={closing}
          onRequestClose={requestClose}
          onClosed={closed}
        />
      )}
    </main>
  );
}
