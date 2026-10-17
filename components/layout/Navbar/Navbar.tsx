"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Home", "Works", "About", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 999,
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex flex-col justify-center items-end gap-[6px] w-8 h-8 cursor-pointer group"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 9, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="block h-[2px] bg-[#0a0a0a] origin-center"
            style={{ width: "28px" }}
          />
          <motion.span
            animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-[2px] bg-[#0a0a0a]"
            style={{ width: "20px" }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -9, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="block h-[2px] bg-[#0a0a0a] origin-center"
            style={{ width: "28px" }}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: "#0a0a0a" }}
            onClick={() => setOpen(false)}
          >
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  onClick={() => setOpen(false)}
                  className="text-[#F2EDE4] uppercase tracking-widest text-4xl md:text-6xl hover:opacity-40 transition-opacity duration-200"
                  style={{ fontFamily: "var(--font-oswald)", fontWeight: 300 }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
