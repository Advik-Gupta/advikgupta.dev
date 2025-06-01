"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import gsap from "gsap";

import "./navigation.styles.css";

export default function Navbar() {
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const navSubmenuRef = useRef(null);
  const navLinksRef = useRef(null);
  const contactButtonRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.5, ease: "power3.out" }
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
      gsap.to(navLinksRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(contactButtonRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(navSubmenuRef.current, {
        background: "rgb(255, 255, 255/ 0)",
        boxShadow: "none",
        duration: 0.5,
        ease: "power3.out",
      });
    } else if (isScrollingUp) {
      gsap.to(navLinksRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(contactButtonRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(navSubmenuRef.current, {
        background: "rgb(255, 255, 255/ 1)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isScrollingUp, isScrollingDown]);

  return (
    <nav className={`w-full h-1/10 px-8 sm:px-16 py-4 mt-7 fixed`} ref={navRef}>
      <div
        ref={navSubmenuRef}
        className="w-full rounded-[2rem] bg-white flex items-center justify-between px-8 py-4"
      >
        {/* Left Navigation Links */}
        <div ref={navLinksRef} className="flex space-x-8 text-lg font-medium">
          <a href="#journey" className="navText hover:text-gray-600 transition">
            My Journey
          </a>
          <a
            href="#projects"
            className=" navText hover:text-gray-600 transition"
          >
            Projects
          </a>
          <a href="#skills" className="navText hover:text-gray-600 transition">
            Skills
          </a>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <button
            ref={contactButtonRef}
            className="bg-black text-white px-6 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition"
          >
            Contact Me
          </button>
        </div>
      </div>
    </nav>
  );
}
