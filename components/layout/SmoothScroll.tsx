"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onLoaded, setLenis, unlockScroll } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const touch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!touch) {
      const instance = new Lenis({
        autoRaf: false,
        lerp: reduce ? 1 : 0.1,
        wheelMultiplier: 1,
      });
      lenis = instance;
      setLenis(instance);
      instance.on("scroll", ScrollTrigger.update);
      tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const off = onLoaded(() => {
      unlockScroll();
      ScrollTrigger.refresh();
    });

    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      off();
      window.removeEventListener("resize", onResize);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
