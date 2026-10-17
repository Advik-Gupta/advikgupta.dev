"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onLoaded } from "@/lib/scroll";
import { RESUME_URL } from "@/lib/site";
import ArrowIcon from "@/components/ui/ArrowIcon";
import "./Hero.css";

const DRIFT_Y = [-38, 22, -55, 14, -30];
const DRIFT_R = [-9, 6, -13, 7, -5];

function Letters({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((ch, i) => (
        <span key={i} className="hero__char">
          <span className="hero__char-in">{ch}</span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = name.current;
    if (!el) return;

    const fit = () => {
      const stacked = window.matchMedia("(max-width: 640px)").matches;
      const available =
        document.documentElement.clientWidth * (stacked ? 0.88 : 0.965);
      el.style.fontSize = "100px";
      const width = el.getBoundingClientRect().width;
      if (width > 0) el.style.fontSize = `${(100 * available) / width}px`;
    };

    fit();
    document.fonts?.ready.then(() => {
      fit();
      ScrollTrigger.refresh();
    });

    let w = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === w) return;
      w = window.innerWidth;
      fit();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      const intro = gsap.timeline({ paused: true });
      intro
        .from(".hero__char-in", {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.035,
        })
        .from(
          ".hero__fade",
          {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.45,
        );

      const off = onLoaded(() => intro.play());

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        tl.to(
          ".first .hero__char",
          {
            xPercent: (i) => -(5 - i) * 16,
            yPercent: (i) => DRIFT_Y[i % 5],
            rotation: (i) => DRIFT_R[i % 5],
          },
          0,
        )
          .to(
            ".last .hero__char",
            {
              xPercent: (i) => (i + 1) * 16,
              yPercent: (i) => DRIFT_Y[(i + 2) % 5],
              rotation: (i) => -DRIFT_R[(i + 1) % 5],
            },
            0,
          )
          .to(
            ".hero__meta-wrap",
            { opacity: 0, y: -30, letterSpacing: "0.9em" },
            0,
          )
          .to(".hero__role-a", { xPercent: -35, opacity: 0.15 }, 0)
          .to(".hero__role-b", { xPercent: 35, opacity: 0.15 }, 0)
          .to(".hero__content", { y: "18vh" }, 0)
          .to(".hero__bar-wrap", { opacity: 0, y: 30 }, 0);
      });

      return off;
    },
    { scope: root },
  );

  return (
    <section className="hero" id="home" ref={root}>
      <div className="hero__content">
        <h1 className="hero__name" aria-label="Advik Gupta" ref={name}>
          <span className="first" aria-hidden="true">
            <Letters word="ADVIK" />
          </span>
          <span className="last" aria-hidden="true">
            <Letters word="GUPTA" />
          </span>
        </h1>

        <div className="hero__meta-wrap">
          <p className="hero__meta hero__fade">
            Crafting amazing digital experiences
          </p>
        </div>

        <div className="hero__role hero__fade">
          <span className="hero__role-a">PROFESSIONAL</span>
          <span className="hero__role-b">WEB DEVELOPER</span>
        </div>
      </div>

      <div className="hero__bar-wrap">
        <div className="hero__bar">
          <span className="hero__bar-item hero__fade">
            <span className="hero__pulse" aria-hidden="true" />
            20, India
          </span>
          {RESUME_URL ? (
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__bar-item hero__resume hero__fade"
              data-cursor="grow"
            >
              <span className="link-line">See resume</span>
              <ArrowIcon className="hero__resume-icon" />
            </a>
          ) : (
            <span className="hero__bar-item hero__fade">ECE · VIT</span>
          )}
        </div>
      </div>
    </section>
  );
}
