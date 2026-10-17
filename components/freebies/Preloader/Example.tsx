"use client";

import Preloader from "./Preloader";

export default function Example() {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        background: "#111",
        color: "#ede8df",
        fontFamily: "var(--font-oswald, sans-serif)",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontSize: 13,
      }}
    >
      <p>Your site, loaded ✓</p>
      <Preloader
        contained
        words={["websites", "backends", "experiences"]}
        images={[
          "/assets/image6.jpeg",
          "/assets/image5.JPG",
          "/assets/image7.JPG",
          "/assets/image22.JPG",
        ]}
      />
    </div>
  );
}
