"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Hackathon } from "./data";
import HackathonDetail from "./HackathonDetail";
import "./Hackathons.css";

type Props = {
  hackathons: Hackathon[];
  upcoming: number;
  scoreboard: { label: string; value: string; placeholder?: boolean }[];
};

type Open = { hack: Hackathon; index: number; origin: DOMRect | null };

const STRAPS = [9, 12, 10, 13, 9.5];

export default function HackathonsIndex({
  hackathons,
  upcoming,
  scoreboard,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Open | null>(null);
  const [closing, setClosing] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hk__title-in", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
        });
        gsap.from(".hk__board, .hk__intro", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        });
        gsap.from(".hk__hang", {
          yPercent: -120,
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.12,
          delay: 0.5,
          clearProps: "transform",
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    const el = rail.current;
    if (
      !el ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const hangs = Array.from(el.querySelectorAll<HTMLElement>(".hk__hang"));
    const state = hangs.map(() => ({ a: 0, v: 0 }));
    let frame = 0;
    let lastX = 0;
    let lastT = 0;

    const step = () => {
      let moving = false;
      state.forEach((s, i) => {
        s.v += -0.045 * s.a;
        s.v *= 0.95;
        s.a = Math.max(-28, Math.min(28, s.a + s.v));
        if (Math.abs(s.a) > 0.02 || Math.abs(s.v) > 0.02) moving = true;
        hangs[i].style.transform = `rotate(${s.a}deg)`;
      });
      frame = moving ? requestAnimationFrame(step) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(8, now - lastT);
      const vx = lastT ? (e.clientX - lastX) / dt : 0;
      lastX = e.clientX;
      lastT = now;
      hangs.forEach((h, i) => {
        const r = h.getBoundingClientRect();
        if (e.clientY < r.top || e.clientY > r.bottom) return;
        const dist = Math.abs(e.clientX - (r.left + r.width / 2));
        if (dist > r.width * 0.75) return;
        const force = Math.max(-2.4, Math.min(2.4, vx * 1.6));
        state[i].v -= force * (1 - dist / (r.width * 0.75));
      });
      if (!frame) frame = requestAnimationFrame(step);
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const show = useCallback(
    (hack: Hackathon, origin: DOMRect | null, push: boolean) => {
      const index = hackathons.findIndex((h) => h.slug === hack.slug);
      setClosing(false);
      setOpen({ hack, index, origin });
      if (push)
        window.history.pushState({ h: hack.slug }, "", `?h=${hack.slug}`);
    },
    [hackathons],
  );

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("h");
    const match = hackathons.find((h) => h.slug === slug);
    const frame = requestAnimationFrame(() => {
      if (match) show(match, null, false);
    });
    const onPop = () => {
      const h = new URLSearchParams(window.location.search).get("h");
      const next = hackathons.find((x) => x.slug === h);
      if (next) show(next, null, false);
      else setClosing(true);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", onPop);
    };
  }, [hackathons, show]);

  const requestClose = useCallback(() => {
    if (window.history.state?.h) window.history.back();
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
    <main id="main" className="hk" ref={root}>
      <Link href="/" className="hk__back link-line" data-cursor="grow">
        ← Back home
      </Link>

      <header className="hk__head">
        <h1 className="hk__title display">
          <span className="hk__mask">
            <span className="hk__title-in">Hackathons</span>
          </span>
        </h1>
        <p className="hk__intro">
          Weekends spent shipping too fast and sleeping too little. Every badge
          is a story. Give them a nudge, then click one to relive the hours.
        </p>
      </header>

      <div className="hk__board" aria-label="Scoreboard">
        {scoreboard.map((s) => (
          <div
            key={s.label}
            className={`hk__score ${s.placeholder ? "is-ph" : ""}`}
          >
            <span className="hk__score-value">{s.value}</span>
            <span className="hk__score-label">
              {s.label}
              {s.placeholder && <i>to fill</i>}
            </span>
          </div>
        ))}
      </div>

      <div className="hk__rail-wrap" ref={rail}>
        <div className="hk__rail" aria-hidden="true">
          <span className="hk__bolt" />
          <span className="hk__bolt" />
        </div>
        <ul className="hk__hangs">
          {hackathons.map((h, i) => (
            <li
              key={h.slug}
              className="hk__hang"
              style={
                {
                  "--strap": `${STRAPS[i % STRAPS.length]}rem`,
                } as React.CSSProperties
              }
            >
              <div
                className="hk__sway"
                style={{ animationDelay: `${i * -1.3}s` }}
              >
                <span className="hk__strap" aria-hidden="true">
                  <span>
                    ADVIK GUPTA · ADVIK GUPTA · ADVIK GUPTA · ADVIK GUPTA ·
                  </span>
                </span>
                <span className="hk__clip" aria-hidden="true" />
                <button
                  type="button"
                  className="hk__badge"
                  onClick={(e) =>
                    show(h, e.currentTarget.getBoundingClientRect(), true)
                  }
                  data-cursor="grow"
                >
                  <span className="hk__slot" aria-hidden="true" />
                  <span className="hk__band">
                    <span>{h.event}</span>
                  </span>
                  <span className="hk__badge-body">
                    <span className="hk__role">Hacker</span>
                    <span className="hk__project display">{h.project}</span>
                    <span className="hk__year">
                      {h.year} · {h.duration}
                    </span>
                    <span className="hk__stamp">{h.placement}</span>
                    <span className="hk__cta">Relive the {h.duration} →</span>
                  </span>
                  <span className="hk__barcode" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
          {Array.from({ length: upcoming }, (_, i) => (
            <li
              key={`ghost-${i}`}
              className="hk__hang hk__hang--ghost"
              style={
                {
                  "--strap": `${STRAPS[(hackathons.length + i) % STRAPS.length]}rem`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              <div
                className="hk__sway"
                style={{ animationDelay: `${(hackathons.length + i) * -1.3}s` }}
              >
                <span className="hk__strap hk__strap--ghost" />
                <span className="hk__clip" />
                <div className="hk__badge hk__badge--ghost">
                  <span className="hk__slot" />
                  <span className="hk__badge-body">
                    <span className="hk__role">Next up</span>
                    <span className="hk__project display">Your next win?</span>
                    <span className="hk__year">Coming soon</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <HackathonDetail
          hack={open.hack}
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
