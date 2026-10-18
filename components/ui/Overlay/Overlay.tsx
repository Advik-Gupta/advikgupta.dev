"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import "./Overlay.css";

type Props = {
  label: string;
  origin: DOMRect | null;
  closing: boolean;
  onRequestClose: () => void;
  onClosed: () => void;
  onScroll?: (el: HTMLDivElement) => void;
  className?: string;
  children: ReactNode;
};

const clipFrom = (r: DOMRect) =>
  `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round 18px)`;

export default function Overlay({
  label,
  origin,
  closing,
  onRequestClose,
  onClosed,
  onScroll,
  className = "",
  children,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const done = useRef(onClosed);
  const scrolled = useRef(onScroll);

  useEffect(() => {
    done.current = onClosed;
    scrolled.current = onScroll;
  });

  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onRequestClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onRequestClose]);

  useEffect(() => {
    const box = scroller.current;
    if (!box) return;
    let frame = 0;
    const handle = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scrolled.current?.(box);
      });
    };
    handle();
    box.addEventListener("scroll", handle, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      box.removeEventListener("scroll", handle);
    };
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      if (reduce) return;

      const tl = gsap.timeline();
      if (mobile) {
        tl.fromTo(
          el,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.7, ease: "expo.out" },
        );
      } else if (origin) {
        tl.fromTo(
          el,
          { clipPath: clipFrom(origin) },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            duration: 1,
            ease: "expo.inOut",
          },
        );
      } else {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" },
        );
      }
      tl.from(
        ".ov-word",
        { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06 },
        mobile ? 0.2 : 0.55,
      ).from(
        ".ov-reveal",
        { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.06 },
        mobile ? 0.3 : 0.7,
      );
    },
    { scope: root },
  );

  useEffect(() => {
    if (!closing) return;
    const el = root.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done.current();
      return;
    }
    const tween = mobile
      ? gsap.to(el, { yPercent: 100, duration: 0.55, ease: "expo.in" })
      : origin
        ? gsap
            .timeline()
            .to(el.querySelector(".ov__scroll"), { opacity: 0, duration: 0.25 })
            .to(el, {
              clipPath: clipFrom(origin),
              duration: 0.8,
              ease: "expo.inOut",
            })
        : gsap.to(el, {
            opacity: 0,
            scale: 0.97,
            duration: 0.45,
            ease: "power2.in",
          });
    tween.eventCallback("onComplete", () => done.current());
    return () => {
      tween.kill();
    };
  }, [closing, origin]);

  return (
    <div
      className={`ov ${className}`}
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="ov__scroll" ref={scroller} data-lenis-prevent>
        {children}
      </div>
    </div>
  );
}
