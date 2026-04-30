"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "./Navbar";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const photoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);
  const professionalMargin = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["14rem", "1rem"],
  );

  const mobilePhotoOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0, 0],
  );
  const mobilePhotoY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);

  return (
    <>
      <Navbar />

      <section className="hero" ref={heroRef}>
        <div className="hero__content">
          <h1 className="hero__name">
            <span className="first">ADVIK</span>
            <span className="last">GUPTA</span>
          </h1>

          <p className="hero__meta">Crafting amazing digital experiences</p>

          {/* Desktop: animated */}
          <div className="hero__role hero__role--desktop">
            <motion.span style={{ marginRight: professionalMargin }}>
              PROFESSIONAL
            </motion.span>
            <motion.div
              className="hero__photo-inline-wrapper"
              style={{ opacity: photoOpacity, y: photoY }}
            >
              <Image
                src="/assets/advik_bg_removed.png"
                alt="Advik Gupta"
                width={400}
                height={600}
                className="hero__photo-inline"
              />
            </motion.div>
            <span>WEB DEVELOPER</span>
          </div>

          {/* Mobile: static, no animation */}
          <div className="hero__role hero__role--mobile">
            <span>PROFESSIONAL</span>
            <span>WEB DEVELOPER</span>
          </div>
        </div>

        {/* Mobile photo: fade on scroll only */}
        <div className="hero__photo-bottom-wrapper">
          <motion.div style={{ opacity: mobilePhotoOpacity, y: mobilePhotoY }}>
            <Image
              src="/assets/advik_bg_removed.png"
              alt="Advik Gupta"
              width={400}
              height={600}
              className="hero__photo-bottom"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
