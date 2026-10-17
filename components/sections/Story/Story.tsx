"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import ResumeButton from "@/components/ui/ResumeButton";
import "./Story.css";

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".story__statement", { type: "words" });

        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".story__statement",
              start: "top 80%",
              end: "bottom 50%",
              scrub: 0.6,
            },
          },
        );

        gsap.from(".story__aside > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".story__aside", start: "top 85%" },
        });

        gsap.to(".story__wave path", {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section className="story" id="story" ref={root}>
      <h2 className="story__statement display">
        I&apos;m Advik. I study electronics at VIT, but most nights I&apos;m
        writing <span className="hl">software</span>. The kind that keeps
        standing when <span className="hl">real people</span> show up.
      </h2>

      <div className="story__aside">
        <svg
          className="story__wave"
          viewBox="0 0 240 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 20 C 22 2, 38 2, 58 20 S 94 38, 114 20 S 150 2, 170 20 S 206 38, 238 20"
            pathLength={1}
          />
        </svg>
        <p className="story__line">
          Backends in Go. Interfaces with React. Robust for hundreds of users:
          take it apart until it makes sense, then build it properly.
        </p>
        <ResumeButton />
      </div>
    </section>
  );
}
