"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import ArrowIcon from "@/components/ui/ArrowIcon";
import "./WorkTogether.css";

export default function WorkTogether() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".wt__line-in", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".wt__reveal", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 65%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="wt" aria-labelledby="wt-title">
      <div className="wt__inner" ref={root}>
        <h2 id="wt-title" className="wt__title display">
          <span className="wt__line">
            <span className="wt__line-in">Got something</span>
          </span>
          <span className="wt__line">
            <span className="wt__line-in hl">to build?</span>
          </span>
        </h2>
        <div className="wt__side">
          <p className="wt__text wt__reveal">
            Websites, web apps, backends or software for the factory floor. If
            it needs to work when real people show up, I&apos;d like to hear
            about it.
          </p>
          <div className="wt__actions wt__reveal">
            <Link href="/contact" className="wt__cta" data-cursor="grow">
              Start a project
              <span className="wt__cta-icon" aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/projects"
              className="wt__ghost link-line"
              data-cursor="grow"
            >
              See my work first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
