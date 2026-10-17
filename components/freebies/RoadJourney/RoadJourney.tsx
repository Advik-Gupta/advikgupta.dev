"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import "./RoadJourney.css";

export type Stop = { title: string; note: string; kicker?: string };

type Props = {
  stops: Stop[];
  scroller?: RefObject<HTMLElement | null>;
};

type Point = { x: number; y: number };

type Geometry = {
  w: number;
  h: number;
  road: number;
  points: Point[];
  d: string;
  segments: string[];
  end: Point;
};

function curve(a: Point, b: Point) {
  const k = (b.y - a.y) * 0.55;
  return `C ${a.x} ${a.y + k}, ${b.x} ${b.y - k}, ${b.x} ${b.y}`;
}

export default function RoadJourney({ stops, scroller }: Props) {
  const map = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const segRef = useRef<SVGGElement>(null);
  const car = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  useEffect(() => {
    const el = map.current;
    const ol = list.current;
    if (!el || !ol) return;

    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const narrow = w < 640;
      const road = narrow ? 16 : 28;
      const amp = narrow ? w * 0.035 : Math.min(80, w * 0.06);
      const items = Array.from(ol.children) as HTMLElement[];
      const lanes = items.map((_, i) =>
        i % 2 === 0 ? w * (narrow ? 0.885 : 0.7) : w * (narrow ? 0.115 : 0.3),
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
      const last = items[items.length - 1];
      const end = {
        x: lanes[lanes.length - 1],
        y: Math.min(h, last.offsetTop + last.offsetHeight + 80),
      };
      const all = [{ x: lanes[0], y: 0 }, ...route, end];
      const segments = all
        .slice(1)
        .map((b, i) => `M ${all[i].x} ${all[i].y} ${curve(all[i], b)}`);
      setGeo({
        w,
        h,
        road,
        points,
        end,
        segments,
        d:
          `M ${all[0].x} ${all[0].y} ` +
          all
            .slice(1)
            .map((b, i) => curve(all[i], b))
            .join(" "),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stops]);

  useEffect(() => {
    const el = map.current;
    const rig = car.current;
    const group = segRef.current;
    if (!geo || !el || !rig || !group) return;

    const segs = Array.from(group.querySelectorAll<SVGPathElement>("path"));
    const segLen = segs.map((p) => p.getTotalLength());
    const segStart = segLen.map((_, i) =>
      segLen.slice(0, i).reduce((a, b) => a + b, 0),
    );
    const xs: number[] = [];
    const ys: number[] = [];
    const lens: number[] = [];
    segs.forEach((p, s) => {
      const n = Math.max(6, Math.ceil(segLen[s] / 8));
      for (let i = s === 0 ? 0 : 1; i <= n; i++) {
        const pt = p.getPointAtLength((segLen[s] * i) / n);
        xs.push(pt.x);
        ys.push(pt.y);
        lens.push(segStart[s] + (segLen[s] * i) / n);
      }
      p.style.strokeDasharray = `${segLen[s] + 1}`;
      p.style.strokeDashoffset = `${segLen[s] + 1}`;
    });
    const N = ys.length - 1;
    const angles = xs.map((_, i) => {
      const j = Math.min(N, i + 1);
      const k = j === i ? i - 1 : i;
      return Math.atan2(ys[j] - ys[k], xs[j] - xs[k]);
    });

    const items = Array.from(list.current?.children ?? []) as HTMLElement[];
    const lane = geo.road * 0.24;
    const parkY = geo.end.y - geo.road * 2.5;
    let current = -1;
    let reached = -1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = scroller?.current;
      const viewTop = box ? box.getBoundingClientRect().top : 0;
      const viewH = box ? box.clientHeight : window.innerHeight;
      const raw = viewH * 0.6 - (el.getBoundingClientRect().top - viewTop);
      const y = Math.min(parkY, raw);

      let lo = 0;
      let hi = N;
      if (y <= ys[0]) hi = 1;
      else if (y >= ys[N]) lo = N - 1;
      else
        while (hi - lo > 1) {
          const mid = (lo + hi) >> 1;
          if (ys[mid] < y) lo = mid;
          else hi = mid;
        }
      const t = Math.min(1, Math.max(0, (y - ys[lo]) / (ys[hi] - ys[lo] || 1)));
      const px = xs[lo] + (xs[hi] - xs[lo]) * t;
      const py = ys[lo] + (ys[hi] - ys[lo]) * t;
      const a = angles[lo] + (angles[hi] - angles[lo]) * t;
      const len = lens[lo] + (lens[hi] - lens[lo]) * t;

      rig.style.transform = `translate3d(${px + Math.sin(a) * lane}px, ${py - Math.cos(a) * lane}px, 0) rotate(${(a * 180) / Math.PI}deg)`;

      let k = segStart.length - 1;
      while (k > 0 && segStart[k] > len) k--;
      if (k !== current) {
        segs.forEach((p, i) => {
          if (i < k) p.style.strokeDashoffset = "0";
          else if (i > k) p.style.strokeDashoffset = `${segLen[i] + 1}`;
        });
        current = k;
      }
      segs[k].style.strokeDashoffset =
        `${segLen[k] + 1 - Math.min(segLen[k], len - segStart[k])}`;

      let count = 0;
      while (count < geo.points.length && py >= geo.points[count].y - 4)
        count++;
      if (count !== reached) {
        reached = count;
        items.forEach((item, i) =>
          item.classList.toggle("is-reached", i < count),
        );
      }
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
  }, [geo, scroller]);

  return (
    <div className="rj" ref={map}>
      {geo && (
        <svg
          className="rj__road"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rj-fade" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0"
                style={{ stopColor: "var(--rj-bg)", stopOpacity: 0 }}
              />
              <stop offset="1" style={{ stopColor: "var(--rj-bg)" }} />
            </linearGradient>
          </defs>
          <path
            d={geo.d}
            className="rj__asphalt rj__asphalt--ghost"
            strokeWidth={geo.road}
          />
          <g ref={segRef}>
            {geo.segments.map((d, i) => (
              <path
                key={i}
                d={d}
                className="rj__asphalt"
                strokeWidth={geo.road + 0.5}
              />
            ))}
          </g>
          <path
            d={geo.d}
            className="rj__lines"
            strokeWidth={geo.road < 20 ? 1.5 : 2}
          />
          <rect
            x={geo.end.x - geo.road * 2}
            y={geo.end.y - 110}
            width={geo.road * 4}
            height={120}
            fill="url(#rj-fade)"
          />
        </svg>
      )}

      <ol className="rj__stops" ref={list}>
        {stops.map((s, i) => (
          <li
            key={s.title}
            className={`rj__stop ${i % 2 === 0 ? "is-left" : "is-right"}`}
          >
            <div className="rj__card">
              <span className="rj__kicker">
                {s.kicker ?? `Stop ${String(i + 1).padStart(2, "0")}`}
              </span>
              <h3 className="rj__title">{s.title}</h3>
              <p className="rj__note">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>

      {geo && (
        <div className="rj__car" ref={car} aria-hidden="true">
          <svg viewBox="-16 -10 32 20" width={geo.road < 20 ? 22 : 34}>
            <rect x="-9" y="-8" width="4.5" height="2.5" rx="1" fill="#111" />
            <rect x="4" y="-8" width="4.5" height="2.5" rx="1" fill="#111" />
            <rect x="-9" y="5.5" width="4.5" height="2.5" rx="1" fill="#111" />
            <rect x="4" y="5.5" width="4.5" height="2.5" rx="1" fill="#111" />
            <rect
              x="-11"
              y="-6.5"
              width="22"
              height="13"
              rx="5"
              fill="var(--rj-accent)"
            />
            <rect x="2" y="-4.8" width="5" height="9.6" rx="1.5" fill="#111" />
            <circle cx="10.5" cy="-3.5" r="1.1" fill="#fff3c4" />
            <circle cx="10.5" cy="3.5" r="1.1" fill="#fff3c4" />
          </svg>
        </div>
      )}
    </div>
  );
}
