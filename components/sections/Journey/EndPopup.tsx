"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ScrollTrigger } from "@/lib/gsap";
import ArrowIcon from "@/components/ui/ArrowIcon";
import "./EndPopup.css";

const KEY = "freebies-popup-seen";

export default function EndPopup() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 760px), (hover: none)").matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;

    const st = ScrollTrigger.create({
      trigger: ".journey__stop--future",
      start: "center 60%",
      once: true,
      onEnter: () => {
        setOpen(true);
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
      },
    });
    return () => st.kill();
  }, []);

  const close = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      setLeaving(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={`end-pop ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-label="Freebies"
    >
      <button
        type="button"
        className="end-pop__close"
        onClick={close}
        aria-label="Close"
        data-cursor="grow"
      >
        ×
      </button>
      <span className="end-pop__badge">You made it to the end</span>
      <p className="end-pop__title display">
        Thanks for spending your time here
      </p>
      <p className="end-pop__text">
        I&apos;ve got some freebies for you: components from this very site,
        free to copy into your own projects.
      </p>
      <div className="end-pop__actions">
        <Link
          href="/freebies"
          className="end-pop__cta"
          onClick={close}
          data-cursor="grow"
        >
          Grab the freebies
          <ArrowIcon />
        </Link>
        <button
          type="button"
          className="end-pop__later"
          onClick={close}
          data-cursor="grow"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
