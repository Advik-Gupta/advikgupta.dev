"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";
import { EMAIL, RESUME_URL, SOCIALS } from "@/lib/site";
import ArrowIcon from "@/components/ui/ArrowIcon";
import VelloreTime from "./VelloreTime";
import "./Contact.css";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  const rows = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    ...SOCIALS.map((s) => ({
      label: s.label,
      value: s.href.replace(/^https?:\/\/(www\.)?/, ""),
      href: s.href,
    })),
    ...(RESUME_URL
      ? [{ label: "Resume", value: "The one-page version", href: RESUME_URL }]
      : []),
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact__line-in", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact__title", start: "top 80%" },
        });

        gsap.from(".contact__row", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".contact__rows", start: "top 85%" },
        });

        gsap.from(".contact__giant-char", {
          yPercent: 100,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".contact__giant", start: "top 95%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="contact__inner">
        <h2 className="contact__title display">
          <span className="contact__line">
            <span className="contact__line-in">That&apos;s the story</span>
          </span>
          <span className="contact__line">
            <span className="contact__line-in hl">so far.</span>
          </span>
        </h2>

        <p className="contact__lede">
          Always up for a good problem, a side project, or a long conversation
          about why the build is red. My inbox is open.
        </p>

        <ul className="contact__rows">
          {rows.map((r) => (
            <li key={r.label} className="contact__row">
              <a
                href={r.href}
                target={r.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="contact__link"
                data-cursor="grow"
              >
                <span className="contact__row-label">{r.label}</span>
                <span className="contact__row-value">{r.value}</span>
                <span className="contact__row-icon">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="contact__footer">
        <div className="contact__bar">
          <span>© {new Date().getFullYear()} Advik Gupta</span>
          <VelloreTime />
          <button
            type="button"
            className="contact__top link-line"
            onClick={() => scrollToId("home")}
            data-cursor="grow"
          >
            Back to top ↑
          </button>
        </div>
        <p className="contact__giant display" aria-hidden="true">
          {"ADVIK GUPTA".split("").map((ch, i) => (
            <span key={i} className="contact__giant-mask">
              <span className="contact__giant-char">
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </p>
      </footer>
    </section>
  );
}
