"use client";

import { useRef } from "react";
import RoadJourney from "./RoadJourney";

const STOPS = [
  {
    title: "Hello, world",
    note: "Wrote my first line of code and never looked back.",
  },
  { title: "First client", note: "Someone actually paid me to build a thing." },
  { title: "Big project", note: "Shipped something thousands of people use." },
  { title: "Next exit", note: "Working on it right now.", kicker: "Up next" },
];

export default function Example() {
  const box = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      data-lenis-prevent
      style={{
        height: "100%",
        overflowY: "auto",
        background: "#ede8df",
        padding: "0 1rem",
      }}
    >
      <p
        style={{
          margin: 0,
          padding: "2rem 0 0",
          fontFamily: "var(--font-oswald, sans-serif)",
          fontSize: 12,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#7a7a7a",
        }}
      >
        Scroll inside this window ↓
      </p>
      <RoadJourney stops={STOPS} scroller={box} />
    </div>
  );
}
