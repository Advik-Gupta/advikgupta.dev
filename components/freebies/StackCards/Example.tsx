"use client";

import { useRef } from "react";
import StackCards from "./StackCards";

const CARDS = [
  {
    title: "Project one",
    year: "2025",
    hook: "Two million visits and counting.",
    text: "A short story about what this project is and why it matters.",
    tags: ["Next.js", "MongoDB"],
    tone: "ink" as const,
  },
  {
    title: "Project two",
    year: "2026",
    hook: "From inbox chaos to one record per issue.",
    text: "Each card sticks, and the one below slides over it.",
    tags: ["Go", "PostgreSQL"],
    tone: "accent" as const,
  },
  {
    title: "Project three",
    year: "2026",
    hook: "Built in a weekend.",
    text: "The card underneath shrinks back and dims as it gets covered.",
    tags: ["TypeScript"],
    tone: "soft" as const,
  },
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
        padding: "1rem 1rem 3rem",
      }}
    >
      <StackCards cards={CARDS} scroller={box} cardHeight="400px" top={16} />
    </div>
  );
}
