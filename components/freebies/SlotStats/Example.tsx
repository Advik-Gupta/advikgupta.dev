"use client";

import SlotStats from "./SlotStats";

const STATS = [
  { value: "3", suffix: "M+", caption: "Total visits", tone: "ink" as const },
  { value: "10", caption: "Client projects", tone: "accent" as const },
  {
    value: "12",
    prefix: "$",
    suffix: "K+",
    caption: "Saved for clients",
    tone: "soft" as const,
  },
  { value: "850", caption: "Hours saved", tone: "outline" as const },
];

export default function Example() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#ede8df",
        padding: "1rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <SlotStats stats={STATS} />
      </div>
    </div>
  );
}
