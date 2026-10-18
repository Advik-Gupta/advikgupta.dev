"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STOPS } from "./stops";
import { buildPath, buildSegments, type Point } from "./path";
import Vehicles from "./Vehicles";
import ConstructionZone from "./ConstructionZone";
import EndPopup from "./EndPopup";
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
  segments: string[];
};

type Track = {
  x: Float32Array;
  y: Float32Array;
  a: Float32Array;
  len: Float32Array;
  segStart: number[];
  segLen: number[];
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function sampleTrack(paths: SVGPathElement[]): Track {
  const xs: number[] = [];
  const ys: number[] = [];
  const lens: number[] = [];
  const segStart: number[] = [];
  const segLen: number[] = [];
  let offset = 0;
  paths.forEach((p) => {
    const L = p.getTotalLength();
    segStart.push(offset);
    segLen.push(L);
    const n = Math.max(6, Math.ceil(L / 8));
    for (let i = xs.length ? 1 : 0; i <= n; i++) {
      const pt = p.getPointAtLength((L * i) / n);
      xs.push(pt.x);
      ys.push(pt.y);
      lens.push(offset + (L * i) / n);
    }
    offset += L;
  });
  const a = new Float32Array(xs.length);
  for (let i = 0; i < xs.length; i++) {
    const j = Math.min(xs.length - 1, i + 1);
    const k = j === i ? i - 1 : i;
    a[i] = Math.atan2(ys[j] - ys[k], xs[j] - xs[k]);
  }
  return {
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    a,
    len: Float32Array.from(lens),
    segStart,
    segLen,
  };
}

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<HTMLOListElement>(null);
  const segRef = useRef<SVGGElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  useEffect(() => {
    const el = map.current;
    const list = stopsRef.current;
    if (!el || !list) return;

    let lastW = 0;
    let lastH = 0;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === lastW && Math.abs(h - lastH) < 2) return;
      lastW = w;
      lastH = h;
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
      const all = [start, ...route, end];
      setGeo({
        w,
        h,
        road,
        mobile,
        points,
        end,
        d: buildPath(all),
        segments: buildSegments(all),
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
              gsap.from(card, {
                x: i % 2 === 0 ? -40 : 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
              });
            });
        },
      );
    },
    { scope: root },
  );

  useEffect(() => {
    const segGroup = segRef.current;
    const rig = rigRef.current;
    const el = map.current;
    if (!geo || !segGroup || !rig || !el) return;

    const segs = Array.from(segGroup.querySelectorAll<SVGPathElement>("path"));
    const track = sampleTrack(segs);
    const N = track.y.length - 1;
    segs.forEach((p, i) => {
      p.style.strokeDasharray = `${track.segLen[i] + 1}`;
      p.style.strokeDashoffset = `${track.segLen[i] + 1}`;
    });

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
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
      el.querySelectorAll<HTMLElement>(".journey__smoke"),
    );
    const lane = geo.road * 0.24;
    const zone = geo.points[ROADWORK];
    const parkY = geo.end.y - geo.road * 2.5;
    let stage = -1;
    let seg = -1;
    let reached = -1;
    let launched = false;
    let frame = 0;

    const indexAtY = (y: number) => {
      if (y <= track.y[0]) return 0;
      if (y >= track.y[N]) return N;
      let lo = 0;
      let hi = N;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (track.y[mid] < y) lo = mid;
        else hi = mid;
      }
      const a = track.y[lo];
      const b = track.y[hi];
      return lo + (b === a ? 0 : (y - a) / (b - a));
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

    const reveal = (len: number) => {
      let k = track.segStart.length - 1;
      while (k > 0 && track.segStart[k] > len) k--;
      if (k !== seg) {
        segs.forEach((p, i) => {
          if (i < k) p.style.strokeDashoffset = "0";
          else if (i > k) p.style.strokeDashoffset = `${track.segLen[i] + 1}`;
        });
        seg = k;
      }
      const local = Math.min(track.segLen[k], len - track.segStart[k]);
      segs[k].style.strokeDashoffset = `${track.segLen[k] + 1 - local}`;
    };

    const update = () => {
      frame = 0;
      const raw = reduce
        ? parkY
        : window.innerHeight * 0.62 - el.getBoundingClientRect().top;
      const f = indexAtY(Math.min(parkY, raw));
      const i = Math.floor(f);
      const j = Math.min(N, i + 1);
      const t = f - i;
      const px = track.x[i] + (track.x[j] - track.x[i]) * t;
      const py = track.y[i] + (track.y[j] - track.y[i]) * t;
      const ang = track.a[i] + (track.a[j] - track.a[i]) * t;
      const len = track.len[i] + (track.len[j] - track.len[i]) * t;

      let angle = (ang * 180) / Math.PI;
      if (zone && Math.abs(py - zone.y) < 90 && !reduce)
        angle += (Math.random() - 0.5) * 7;

      setStage(
        py >= geo.points[STAGE_AT[2]].y - 4
          ? 3
          : py >= geo.points[STAGE_AT[1]].y - 4
            ? 2
            : py >= geo.points[STAGE_AT[0]].y + 30
              ? 1
              : 0,
      );

      let x = px + Math.sin(ang) * lane;
      let y = py - Math.cos(ang) * lane;
      let scale = 1;
      let launch = 0;

      if (stage === 3 && raw > parkY && !reduce && !touch) {
        const extra = raw - parkY;
        launch = clamp01(extra / 160);
        const e = 1 - Math.pow(1 - launch, 3);
        angle = 90 + (-75 - 90) * e;
        const dist = Math.max(0, extra - 90);
        x += dist * 0.45;
        y -= dist * 2.4;
        scale = 1 + launch * 0.5;
      }

      rig.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg) scale(${scale})`;

      if (launch > 0 || launched) {
        launched = launch > 0;
        if (flame) flame.style.transform = `scaleX(${0.6 + launch * 1.6})`;
        smoke.forEach((s, n) => {
          const k = clamp01(launch * 1.4 - n * 0.15);
          s.style.opacity = String(k > 0 && k < 1 ? 0.7 * (1 - k) + 0.2 : 0);
          s.style.transform = `translate(-50%, -50%) scale(${0.4 + k * 2.2})`;
        });
      }

      reveal(len);

      let count = 0;
      while (count < geo.points.length && py >= geo.points[count].y - 4)
        count++;
      if (count !== reached) {
        reached = count;
        items.forEach((item, n) =>
          item.classList.toggle("is-reached", n < count),
        );
        markers.forEach((m) =>
          m.classList.toggle("is-on", Number(m.dataset.i) < count),
        );
      }
    };

    const desktop = !touch;
    const schedule = () => {
      if (desktop) {
        update();
        return;
      }
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top-=600",
      onUpdate: schedule,
      onRefresh: () => {
        schedule();
      },
    });
    return () => {
      cancelAnimationFrame(frame);
      st.kill();
    };
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
              <linearGradient id="road-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ede8df" stopOpacity="0" />
                <stop offset="1" stopColor="#ede8df" />
              </linearGradient>
            </defs>

            <path
              d={geo.d}
              className="journey__asphalt journey__asphalt--ghost"
              strokeWidth={geo.road}
            />
            <g ref={segRef}>
              {geo.segments.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  className="journey__asphalt journey__seg"
                  strokeWidth={geo.road + 0.5}
                />
              ))}
            </g>
            <path
              d={geo.d}
              className="journey__lines"
              strokeWidth={geo.road < 20 ? 1.5 : 2}
            />
            <rect
              className="journey__fade"
              x={geo.end.x - geo.road * 2}
              y={geo.end.y - 130}
              width={geo.road * 4}
              height={140}
              fill="url(#road-fade)"
            />

            {zone && <ConstructionZone x={zone.x} y={zone.y} road={geo.road} />}

            {geo.points.map((pt, i) =>
              i === ROADWORK ? null : (
                <circle
                  key={i}
                  data-i={i}
                  className="journey__marker"
                  cx={pt.x + (i % 2 === 0 ? -1 : 1) * geo.road * 0.95}
                  cy={pt.y}
                  r={geo.road < 20 ? 5 : 8}
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
          <>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="journey__smoke"
                style={{
                  left: pad.x + (i - 1) * geo.road * 0.6,
                  top: pad.y + geo.road * (0.8 + i * 0.2),
                  width: geo.road,
                  height: geo.road,
                }}
              />
            ))}
            <div className="journey__rig" ref={rigRef} aria-hidden="true">
              <svg viewBox="-45 -25 90 50" width="90" height="50">
                <g transform={`scale(${base})`}>
                  <circle className="journey__poof" r="14" />
                  <Vehicles />
                </g>
              </svg>
            </div>
          </>
        )}
      </div>
      <EndPopup />
    </section>
  );
}
