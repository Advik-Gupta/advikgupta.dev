"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onLoaded, setLenis, unlockScroll } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: reduce ? 1 : 0.1,
      wheelMultiplier: 1,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

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
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
