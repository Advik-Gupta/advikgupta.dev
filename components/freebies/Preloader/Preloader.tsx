"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Preloader.css";

gsap.registerPlugin(useGSAP);

type Props = {
  lead?: string;
  words?: string[];
  images?: string[];
  duration?: number;
  contained?: boolean;
  onDone?: () => void;
};

const SPOTS: [number, number, number][] = [
  [14, 22, -8],
  [84, 20, 7],
  [10, 72, -5],
  [88, 68, 9],
  [36, 11, -10],
  [62, 86, 6],
];

export default function Preloader({
  lead = "creating incredible",
  words = ["websites", "backends", "experiences"],
  images = [],
  duration = 3.2,
  contained = false,
  onDone,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useGSAP(
    () => {
      const counter = { v: 0 };
      const num = root.current?.querySelector<HTMLElement>(".pl__count");
      const render = () => {
        if (num)
          num.textContent = String(Math.round(counter.v)).padStart(3, "0");
      };

      const items = gsap.utils.toArray<HTMLElement>(".pl__word");
      gsap.set(items, { y: 0, yPercent: 110 });
      gsap.set(items[0], { yPercent: 0 });

      const tl = gsap.timeline();
      tl.fromTo(
        ".pl__lead-in",
        { y: 0, yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "expo.out" },
      )
        .fromTo(
          ".pl__pill",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "expo.out" },
          0.1,
        )
        .to(
          counter,
          { v: 100, duration, ease: "power2.inOut", onUpdate: render },
          0.2,
        )
        .fromTo(
          ".pl__bar",
          { scaleX: 0 },
          { scaleX: 1, duration, ease: "power2.inOut" },
          0.2,
        );

      const step = duration / items.length;
      items.forEach((word, i) => {
        if (i === 0) return;
        const at = 0.2 + step * i;
        tl.to(
          items[i - 1],
          { yPercent: -110, duration: 0.5, ease: "expo.inOut" },
          at,
        ).to(word, { yPercent: 0, duration: 0.5, ease: "expo.inOut" }, at);
      });

      const photos = gsap.utils.toArray<HTMLElement>(".pl__photo");
      photos.forEach((photo, i) => {
        const r = Number(photo.dataset.r);
        tl.fromTo(
          photo,
          { scale: 0, rotation: r * 3, opacity: 0 },
          {
            scale: 1,
            rotation: r,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(2)",
          },
          0.35 + (duration * 0.8 * i) / photos.length,
        );
      });

      const exit = duration + 0.45;
      tl.to(
        photos,
        {
          scale: 0,
          left: "50%",
          top: "50%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.04,
        },
        exit,
      )
        .to(
          ".pl__center, .pl__foot",
          { yPercent: -60, opacity: 0, duration: 0.6, ease: "power3.in" },
          exit + 0.1,
        )
        .to(
          root.current,
          {
            yPercent: -100,
            borderBottomLeftRadius: "50% 14%",
            borderBottomRightRadius: "50% 14%",
            duration: 1.2,
            ease: "expo.inOut",
          },
          exit + 0.5,
        )
        .add(() => {
          setDone(true);
          onDone?.();
        });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className={`pl ${contained ? "pl--contained" : ""}`}
      aria-hidden="true"
    >
      {images.slice(0, SPOTS.length).map((src, i) => (
        <div
          key={src}
          className="pl__photo"
          data-r={SPOTS[i][2]}
          style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` }}
        >
          <img src={src} alt="" />
        </div>
      ))}

      <div className="pl__center">
        <p className="pl__lead">
          <span className="pl__lead-in">{lead}</span>
        </p>
        <div className="pl__pill">
          <span className="pl__sizer">{longest}</span>
          {words.map((w) => (
            <span key={w} className="pl__word">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="pl__foot">
        <span className="pl__num">
          <span className="pl__count">000</span>
          <span className="pl__pct">%</span>
        </span>
      </div>
      <span className="pl__bar" />
    </div>
  );
}
