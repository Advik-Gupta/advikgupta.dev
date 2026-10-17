"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STOPS } from "./stops";
import { buildPath, type Point } from "./path";
import Vehicles from "./Vehicles";
import ConstructionZone from "./ConstructionZone";
import "./Journey.css";

const ROADWORK = STOPS.findIndex((s) => s.kind === "roadwork");
const STAGE_AT = [ROADWORK, 4, STOPS.length - 1];

type Geometry = {
  w: number;
  h: number;
  road: number;
  mobile: boolean;
  points: Point[];
  end: Point;
  d: string;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<HTMLOListElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const rigRef = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  useEffect(() => {
    const el = map.current;
    const list = stopsRef.current;
    if (!el || !list) return;

    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const mobile = w < 640;
      const road = mobile ? 16 : 30;
      const amp = mobile ? w * 0.035 : Math.min(90, w * 0.06);
      const items = Array.from(list.children) as HTMLElement[];
      const lanes = items.map((_, i) =>
        i % 2 === 0 ? w * (mobile ? 0.885 : 0.7) : w * (mobile ? 0.115 : 0.3),
      );
      const points = items.map((item, i) => ({
        x: lanes[i] + (i % 2 === 0 ? amp : -amp),
        y: item.offsetTop + item.offsetHeight / 2,
      }));
      const route = items.flatMap((item, i) => [
        { x: lanes[i], y: item.offsetTop + 10 },
        points[i],
        { x: lanes[i], y: item.offsetTop + item.offsetHeight - 10 },
      ]);
      const start = { x: lanes[0], y: 0 };
      const last = items[items.length - 1];
      const end = {
        x: lanes[lanes.length - 1],
        y: Math.min(
          h,
          last.offsetTop + last.offsetHeight + (mobile ? 70 : 110),
        ),
      };
      setGeo({
        w,
        h,
        road,
        mobile,
        points,
        end,
        d: buildPath([start, ...route, end]),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.from(".journey__title .journey__word", {
        yPercent: 105,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".journey__title", start: "top 85%" },
      });

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 641px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>(".journey__card")
            .forEach((card, i) => {
              gsap.from(card, {
                x: i % 2 === 0 ? -60 : 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%" },
              });
            });
        },
      );

      mm.add(
        "(max-width: 640px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>(".journey__card")
            .forEach((card, i) => {
              const side = i % 2 === 0 ? -1 : 1;
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                  },
                })
                .fromTo(
                  card,
                  { xPercent: side * 70, rotation: side * -4 },
                  {
                    xPercent: 0,
                    rotation: 0,
                    ease: "power2.out",
                    duration: 0.42,
                  },
                )
                .to(card, { duration: 0.16 })
                .to(card, {
                  xPercent: side * 70,
                  rotation: side * 4,
                  ease: "power2.in",
                  duration: 0.42,
                });
            });
        },
      );
    },
    { scope: root },
  );

  useEffect(() => {
    const road = roadRef.current;
    const reveal = revealRef.current;
    const rig = rigRef.current;
    const el = map.current;
    if (!geo || !road || !reveal || !rig || !el) return;

    const total = road.getTotalLength();
    const N = 800;
    const samples: { len: number; y: number }[] = [];
    for (let i = 0; i <= N; i++) {
      const len = (total * i) / N;
      samples.push({ len, y: road.getPointAtLength(len).y });
    }

    reveal.style.strokeDasharray = `${total}`;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = Array.from(stopsRef.current?.children ?? []) as HTMLElement[];
    const markers = Array.from(
      el.querySelectorAll<SVGCircleElement>(".journey__marker"),
    );
    const vehicles = Array.from(
      rig.querySelectorAll<SVGGElement>(".journey__vehicle"),
    );
    const poof = rig.querySelector<SVGCircleElement>(".journey__poof");
    const flame = rig.querySelector<SVGGElement>(".journey__flame");
    const smoke = Array.from(
      el.querySelectorAll<SVGCircleElement>(".journey__smoke"),
    );
    const lane = geo.road * 0.24;
    const zone = geo.points[ROADWORK];
    const parkY = geo.end.y - geo.road * 2.5;
    let stage = -1;

    const lengthAtY = (y: number) => {
      if (y <= samples[0].y) return 0;
      if (y >= samples[N].y) return total;
      let lo = 0;
      let hi = N;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < y) lo = mid;
        else hi = mid;
      }
      const a = samples[lo];
      const b = samples[hi];
      const t = b.y === a.y ? 0 : (y - a.y) / (b.y - a.y);
      return a.len + (b.len - a.len) * t;
    };

    const setStage = (next: number) => {
      if (next === stage) return;
      const first = stage === -1;
      stage = next;
      vehicles.forEach((v, i) => {
        v.style.display = i === next ? "" : "none";
      });
      if (first || reduce) return;
      gsap.fromTo(
        vehicles[next],
        { scale: 0.2, rotation: -20 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(2.5)",
          overwrite: true,
        },
      );
      if (poof)
        gsap.fromTo(
          poof,
          { scale: 0.3, opacity: 0.9 },
          { scale: 2.6, opacity: 0, duration: 0.6, ease: "power2.out" },
        );
    };

    const update = () => {
      const rect = el.getBoundingClientRect();
      const raw = reduce ? parkY : window.innerHeight * 0.62 - rect.top;
      const targetY = Math.min(parkY, raw);
      const len = lengthAtY(targetY);
      const p = road.getPointAtLength(len);
      const q = road.getPointAtLength(Math.min(total, len + 2));
      const dx = q.x - p.x || 0;
      const dy = q.y - p.y || 1;
      const mag = Math.hypot(dx, dy) || 1;
      const nx = dy / mag;
      const ny = -dx / mag;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (zone && Math.abs(p.y - zone.y) < 90 && !reduce)
        angle += (Math.random() - 0.5) * 7;

      const next =
        p.y >= geo.points[STAGE_AT[2]].y - 4
          ? 3
          : p.y >= geo.points[STAGE_AT[1]].y - 4
            ? 2
            : p.y >= geo.points[STAGE_AT[0]].y + 30
              ? 1
              : 0;
      setStage(next);

      let x = p.x + nx * lane;
      let y = p.y + ny * lane;
      let scale = 1;
      let launch = 0;

      if (stage === 3 && raw > parkY && !reduce) {
        const extra = raw - parkY;
        launch = clamp01(extra / 160);
        const ease = 1 - Math.pow(1 - launch, 3);
        angle = 90 + (-75 - 90) * ease;
        const dist = Math.max(0, extra - 90);
        x += dist * 0.45;
        y -= dist * 2.4;
        scale = 1 + launch * 0.5;
      }

      rig.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${angle}) scale(${scale})`,
      );
      if (flame) flame.style.transform = `scaleX(${0.6 + launch * 1.6})`;
      smoke.forEach((s, i) => {
        const t = clamp01(launch * 1.4 - i * 0.15);
        s.style.opacity = String(t > 0 && t < 1 ? 0.7 * (1 - t) + 0.2 : 0);
        s.style.transform = `scale(${0.4 + t * 2.2})`;
      });
      reveal.style.strokeDashoffset = `${total - len}`;

      geo.points.forEach((pt, i) => {
        const on = p.y >= pt.y - 4;
        items[i]?.classList.toggle("is-reached", on);
      });
      markers.forEach((m) => {
        const i = Number(m.dataset.i);
        m.classList.toggle("is-on", p.y >= geo.points[i].y - 4);
      });
    };

    update();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top-=600",
      onUpdate: update,
      onRefresh: update,
    });
    return () => st.kill();
  }, [geo]);

  const zone = geo ? geo.points[ROADWORK] : null;
  const base = geo ? (geo.mobile ? 0.62 : 1.1) : 1;
  const pad = geo
    ? { x: geo.end.x + geo.road * 0.24, y: geo.end.y - geo.road * 2.5 }
    : null;

  return (
    <section className="journey" id="journey" ref={root}>
      <div className="journey__head">
        <h2 className="journey__title display" aria-label="The journey so far">
          <span className="journey__mask">
            <span className="journey__word">The</span>
          </span>{" "}
          <span className="journey__mask">
            <span className="journey__word hl">journey</span>
          </span>{" "}
          <span className="journey__mask">
            <span className="journey__word">so far</span>
          </span>
        </h2>
        <p className="journey__sub">Not exactly a straight road.</p>
      </div>

      <div className="journey__map" ref={map}>
        {geo && (
          <svg
            className="journey__road"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="hazard"
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="12" height="12" fill="#111" />
                <rect width="6" height="12" fill="#ff7a2c" />
              </pattern>
              <linearGradient
                id="road-fade"
                x1="0"
                y1="0"
                x2="0"
                y2={geo.h}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset={(geo.end.y - 120) / geo.h} stopColor="#fff" />
                <stop
                  offset={geo.end.y / geo.h}
                  stopColor="#fff"
                  stopOpacity="0"
                />
              </linearGradient>
              <mask id="road-end" maskUnits="userSpaceOnUse">
                <rect width={geo.w} height={geo.h} fill="url(#road-fade)" />
              </mask>
              <mask id="road-reveal" maskUnits="userSpaceOnUse">
                <path
                  ref={revealRef}
                  d={geo.d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={geo.road + 10}
                />
              </mask>
            </defs>

            <g mask="url(#road-end)">
              <path
                ref={roadRef}
                d={geo.d}
                className="journey__asphalt journey__asphalt--ghost"
                strokeWidth={geo.road}
              />
              <path
                d={geo.d}
                className="journey__lines journey__lines--ghost"
                strokeWidth={geo.road < 20 ? 1.5 : 2}
              />
              <g mask="url(#road-reveal)">
                <path
                  d={geo.d}
                  className="journey__asphalt"
                  strokeWidth={geo.road}
                />
                <path
                  d={geo.d}
                  className="journey__lines"
                  strokeWidth={geo.road < 20 ? 1.5 : 2}
                />
              </g>
            </g>

            {zone && <ConstructionZone x={zone.x} y={zone.y} road={geo.road} />}

            {geo.points.map((pt, i) =>
              i === ROADWORK ? null : (
                <circle
                  key={i}
                  data-i={i}
                  className="journey__marker"
                  cx={pt.x}
                  cy={pt.y}
                  r={geo.road < 20 ? 5 : 8}
                  style={{
                    transform: `translateX(${(i % 2 === 0 ? -1 : 1) * geo.road * 0.95}px)`,
                  }}
                />
              ),
            )}
          </svg>
        )}

        <ol className="journey__stops" ref={stopsRef}>
          {STOPS.map((s, i) => (
            <li
              key={s.title}
              className={`journey__stop ${i % 2 === 0 ? "is-left" : "is-right"} ${s.kind ? `journey__stop--${s.kind}` : ""}`}
            >
              <div className="journey__card">
                <span className="journey__kicker">{s.kicker}</span>
                <h3 className="journey__name display">{s.title}</h3>
                <p className="journey__note">{s.note}</p>
              </div>
            </li>
          ))}
        </ol>

        {geo && pad && (
          <svg
            className="journey__vehicles"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                className="journey__smoke"
                cx={pad.x + (i - 1) * geo.road * 0.6}
                cy={pad.y + geo.road * (0.8 + i * 0.2)}
                r={geo.road * 0.5}
              />
            ))}
            <g ref={rigRef}>
              <g transform={`scale(${base})`}>
                <circle className="journey__poof" r="14" />
                <Vehicles />
              </g>
            </g>
          </svg>
        )}
      </div>
    </section>
  );
}
