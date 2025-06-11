"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import "./hero.styles.css";

export default function Hero() {
  const lastScrollY = useRef(0);
  const heroTextAdvik = useRef(null);
  const heroTextGupta = useRef(null);
  const letterA = useRef(null);
  const letterD = useRef(null);
  const letterV = useRef(null);
  const letterI = useRef(null);
  const letterK = useRef(null);
  const contactButton = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      heroTextAdvik.current,
      { scale: 100, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      heroTextGupta.current,
      { scale: 100, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      letterA.current,
      { x: -1000, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, delay: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      letterI.current,
      { x: 1000, y: -1000, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.5, delay: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      letterV.current,
      { x: 100, y: -1000, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.5, delay: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      letterD.current,
      { y: 1000, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      letterK.current,
      { x: 1000, y: -1000, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.5, delay: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      contactButton.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 1.2, ease: "power3.out" }
    );

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setIsScrollingDown(true);
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
        setIsScrollingDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isScrollingDown) {
      gsap.to(heroTextAdvik.current, {
        x: -1000,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(heroTextGupta.current, {
        x: 1000,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(letterA.current, {
        x: -1000,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(letterI.current, {
        x: 2000,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(letterV.current, {
        x: 500,
        y: -800,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(letterD.current, {
        y: -1000,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(letterK.current, {
        x: -1000,
        y: -1000,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    } else if (isScrollingUp) {
      gsap.to(heroTextAdvik.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(heroTextGupta.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(letterA.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(letterI.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(letterV.current, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(letterD.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(letterK.current, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [isScrollingUp, isScrollingDown]);

  return (
    <>
      <div className="background-letters">
        <span className="bg-letter letter-a" ref={letterA}>
          A
        </span>
        <span className="bg-letter letter-d" ref={letterD}>
          D
        </span>
        <span className="bg-letter letter-v" ref={letterV}>
          V
        </span>
        <span className="bg-letter letter-i" ref={letterI}>
          I
        </span>
        <span className="bg-letter letter-k" ref={letterK}>
          K
        </span>
      </div>
      <main
        className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-black text-center"
        style={{ margin: "50px" }}
      >
        <p className="text-[1.75rem] font-semibold mb-1">Hi, Im</p>
        <h1
          className="text-[6rem] sm:text-[13rem] font-extrabold leading-none tracking-tight"
          style={{
            marginRight: "160px",
            lineHeight: "6.5rem",
            marginTop: "35px",
          }}
          ref={heroTextAdvik}
        >
          ADVIK
        </h1>
        <h1
          className="text-[6rem] sm:text-[13rem] font-extrabold leading-none tracking-tight"
          style={{ marginLeft: "160px" }}
          ref={heroTextGupta}
        >
          GUPTA
        </h1>
        <button
          className="mt-8 px-6 py-3 rounded-full bg-black text-white text-base font-medium shadow-md hover:scale-105 transition-transform"
          ref={contactButton}
        >
          Contact Me
        </button>
      </main>
    </>
  );
}
