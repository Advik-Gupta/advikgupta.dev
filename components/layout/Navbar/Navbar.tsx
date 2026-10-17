"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { lockScroll, scrollToId, unlockScroll } from "@/lib/scroll";
import { EMAIL, NAV_LINKS, PAGE_LINKS, SOCIALS } from "@/lib/site";
import ResumeButton from "@/components/ui/ResumeButton";
import "./Navbar.css";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push(id === "home" ? "/" : `/#${id}`);
      return;
    }
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header className={`nav ${open ? "is-open" : ""}`}>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="nav__toggle"
          data-cursor="grow"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="nav__bar"
            style={{ width: 28 }}
          />
          <motion.span
            animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="nav__bar"
            style={{ width: 20 }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="nav__bar"
            style={{ width: 28 }}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav className="nav__links" aria-label="Main">
              {NAV_LINKS.map((link, i) => (
                <div key={link.id} className="nav__mask">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-110%" }}
                    transition={{
                      delay: i * 0.05 + 0.25,
                      duration: 0.8,
                      ease: EASE,
                    }}
                    className="nav__link"
                    data-cursor="grow"
                  >
                    <span className="nav__index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="nav__text">{link.label}</span>
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              className="nav__foot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            >
              <ResumeButton tone="dark" />
              <div className="nav__pages">
                {PAGE_LINKS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className={`nav__page ${pathname === p.href ? "is-current" : ""} ${p.href === "/freebies" ? "nav__page--desktop" : ""}`}
                    data-cursor="grow"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
              <div className="nav__socials">
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-line"
                  data-cursor="grow"
                >
                  Email
                </a>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line"
                    data-cursor="grow"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
