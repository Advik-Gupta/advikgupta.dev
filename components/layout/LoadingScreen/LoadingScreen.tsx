"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { markLoaded } from "@/lib/scroll";
import "./LoadingScreen.css";

const WORDS = ["websites", "backends", "interfaces", "experiences"];

const PHOTOS = [
  { src: "/assets/image6.jpeg", pos: "p1", r: -8 },
  { src: "/assets/image5.JPG", pos: "p2", r: 7 },
  { src: "/assets/image7.JPG", pos: "p3", r: -5 },
  { src: "/assets/image22.JPG", pos: "p4", r: 9 },
  { src: "/assets/image4.JPG", pos: "p5", r: -10 },
  { src: "/assets/image9.jpeg", pos: "p6", r: 6 },
];

export default function LoadingScreen() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const counter = { v: 0 };
      const num = root.current?.querySelector<HTMLElement>(".loader__count");
      const render = () => {
        if (num)
          num.textContent = String(Math.round(counter.v)).padStart(3, "0");
      };

      const words = gsap.utils.toArray<HTMLElement>(".loader__word");
      gsap.set(words, { y: 0, yPercent: 110 });
      gsap.set(words[0], { yPercent: 0 });

      const total = reduce ? 1 : 3.6;
      const tl = gsap.timeline();

      tl.fromTo(
        ".loader__line-in",
        { y: 0, yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "expo.out" },
      )
        .fromTo(
          ".loader__pill",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "expo.out" },
          0.1,
        )
        .to(
          counter,
          { v: 100, duration: total, ease: "power2.inOut", onUpdate: render },
          0.2,
        )
        .fromTo(
          ".loader__bar",
          { scaleX: 0 },
          { scaleX: 1, duration: total, ease: "power2.inOut" },
          0.2,
        );

      const step = total / WORDS.length;
      words.forEach((w, i) => {
        if (i === 0) return;
        const at = 0.2 + step * i;
        tl.to(
          words[i - 1],
          { yPercent: -110, duration: 0.5, ease: "expo.inOut" },
          at,
        ).to(w, { yPercent: 0, duration: 0.5, ease: "expo.inOut" }, at);
      });

      gsap.utils.toArray<HTMLElement>(".loader__photo").forEach((p, i) => {
        const r = Number(p.dataset.r);
        tl.fromTo(
          p,
          { scale: 0, rotation: r * 3, opacity: 0 },
          {
            scale: 1,
            rotation: r,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(2)",
          },
          0.35 + (total * 0.8 * i) / PHOTOS.length,
        );
        gsap.to(p, {
          y: i % 2 ? 10 : -10,
          duration: 1.6 + i * 0.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.6 + i * 0.15,
        });
      });

      const exitAt = total + 0.45;
      tl.to(
        ".loader__photo",
        {
          scale: 0,
          x: 0,
          y: 0,
          left: "50%",
          top: "50%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.04,
        },
        exitAt,
      )
        .to(
          ".loader__center, .loader__foot",
          { yPercent: -60, opacity: 0, duration: 0.6, ease: "power3.in" },
          exitAt + 0.1,
        )
        .add(() => markLoaded(), exitAt + 0.55)
        .to(
          root.current,
          {
            yPercent: -100,
            borderBottomLeftRadius: "50% 14vh",
            borderBottomRightRadius: "50% 14vh",
            duration: 1.2,
            ease: "expo.inOut",
          },
          exitAt + 0.5,
        )
        .add(() => setDone(true));
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      {PHOTOS.map((p) => (
        <div
          key={p.src}
          className={`loader__photo loader__photo--${p.pos}`}
          data-r={p.r}
        >
          <Image src={p.src} alt="" fill sizes="180px" loading="eager" />
        </div>
      ))}

      <div className="loader__center">
        <p className="loader__line">
          <span className="loader__line-in">creating incredible</span>
        </p>
        <div className="loader__pill">
          <span className="loader__sizer">experiences</span>
          {WORDS.map((w) => (
            <span key={w} className="loader__word">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="loader__foot">
        <span className="loader__tag">Advik Gupta · Portfolio</span>
        <span className="loader__num">
          <span className="loader__count">000</span>
          <span className="loader__pct">%</span>
        </span>
      </div>
      <span className="loader__bar" />
    </div>
  );
}
