"use client";

import Navbar from "./Navbar";
import "./Hero.css";

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__name">
            <span className="first">ADVIK</span>
            <span className="last">GUPTA</span>
          </h1>

          <p className="hero__meta">Creating amazing digital experiences</p>

          <h2 className="hero__role">PROFESSIONAL WEB DEVELOPER</h2>
        </div>
      </section>
    </>
  );
}
