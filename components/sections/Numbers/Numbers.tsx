"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STATS } from "./stats";
import Roller from "./Roller";
import TileIcon from "./TileIcon";
import "./Numbers.css";

export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.utils.toArray<HTMLElement>(".tile").forEach((tile, i) => {
        const strips = Array.from(
          tile.querySelectorAll<HTMLElement>(".roll"),
        ).map((r) => ({
          el: r.querySelector<HTMLElement>(".roll__strip"),
          d: Number(r.dataset.d),
        }));

        const land = (d: number) => -((10 + d) / 20) * 100;

        if (reduce) {
          strips.forEach((s) => gsap.set(s.el, { yPercent: land(s.d) }));
          tile.classList.add("is-in");
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: tile, start: "top 82%", once: true },
          onStart: () => tile.classList.add("is-in"),
        });

        tl.from(tile, {
          y: 80,
          rotation: i % 2 ? 3 : -3,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          clearProps: "transform,opacity",
        });

        strips.forEach((s, j) => {
          tl.to(
            s.el,
            {
              yPercent: land(s.d),
              duration: 1.6 + j * 0.35,
              ease: "power4.out",
            },
            0.15,
          );
        });

        tl.from(
          tile.querySelectorAll(".tile__affix"),
          { scale: 0, rotation: -25, duration: 0.7, ease: "back.out(3)" },
          0.9,
        ).from(
          tile.querySelector(".tile__caption"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          0.6,
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="numbers" ref={root} aria-label="In numbers">
      <ul className="numbers__grid">
        {STATS.map((s) => (
          <li key={s.caption} className={`tile tile--${s.tone}`}>
            <TileIcon kind={s.icon} />
            <p
              className="tile__num display"
              aria-label={`${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`}
            >
              {s.prefix && (
                <span className="tile__affix" aria-hidden="true">
                  {s.prefix}
                </span>
              )}
              <span aria-hidden="true" className="tile__digits">
                {s.value.split("").map((c, i) => (
                  <Roller key={i} digit={Number(c)} />
                ))}
              </span>
              {s.suffix && (
                <span className="tile__affix" aria-hidden="true">
                  {s.suffix}
                </span>
              )}
            </p>
            <p className="tile__caption">{s.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
