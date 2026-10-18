"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { EMAIL, SOCIALS } from "@/lib/site";
import SendAnimation, { type Sent } from "./SendAnimation";
import { COUNTRIES } from "./countries";
import "./ContactForm.css";

const NEEDS = [
  "A website",
  "A web app",
  "Factory software",
  "A backend / API",
  "Something else",
];
const DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "live.com",
  "aol.com",
];

const TIMELINES = ["ASAP", "This month", "In 1–3 months", "Just exploring"];

type Chips = {
  name: string;
  options: string[];
  value: string[];
  multi?: boolean;
  onChange: (v: string[]) => void;
};

function ChipGroup({ name, options, value, multi, onChange }: Chips) {
  return (
    <span className="cf__chips" role="group" aria-label={name}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            className={`cf__chip ${on ? "is-on" : ""}`}
            onClick={() =>
              onChange(
                multi
                  ? on
                    ? value.filter((v) => v !== o)
                    : [...value, o]
                  : on
                    ? []
                    : [o],
              )
            }
            data-cursor="grow"
          >
            {o}
          </button>
        );
      })}
    </span>
  );
}

export default function ContactForm() {
  const root = useRef<HTMLElement>(null);
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [flight, setFlight] = useState<Sent | null>(null);
  const [email, setEmail] = useState("");
  const local = email.split("@")[0];
  const typedDomain = email.includes("@") ? email.split("@")[1] : "";
  const suggestions =
    local && !DOMAINS.includes(typedDomain)
      ? DOMAINS.filter((d) => d.startsWith(typedDomain)).map(
          (d) => `${local}@${d}`,
        )
      : [];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cf__title-in", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
        });
        gsap.from(".cf__line", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.3,
        });
      });
    },
    { scope: root },
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>;
    const payload = { ...data, needs, timeline: timeline[0] ?? "" };
    console.log(payload);
    const rect = e.currentTarget.getBoundingClientRect();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSent(true);
      return;
    }
    setFlight({ rect, name: data.name ?? "", message: data.message ?? "" });
  };

  const landed = () => {
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main id="main" className="cf" ref={root}>
      <Link href="/" className="cf__back link-line" data-cursor="grow">
        ← Back home
      </Link>

      <header className="cf__head">
        <h1 className="cf__title display">
          <span className="cf__mask">
            <span className="cf__title-in">Let&apos;s build</span>
          </span>{" "}
          <span className="cf__mask">
            <span className="cf__title-in hl">something</span>
          </span>
        </h1>
        <p className="cf__intro">
          Fill in the blanks below. I read every message and usually reply
          within a day or two.
        </p>
      </header>

      {sent ? (
        <section className="cf__done" aria-live="polite">
          <p className="cf__done-title display">Message received.</p>
          <p className="cf__done-text cf__type">
            {"Thanks for reaching out. We received it and we'll get back to you ASAP."
              .split("")
              .map((ch, i) => (
                <span key={i} style={{ animationDelay: `${0.4 + i * 0.022}s` }}>
                  {ch}
                </span>
              ))}
          </p>
          <div className="cf__done-actions">
            <Link href="/projects" className="cf__send" data-cursor="grow">
              See projects
            </Link>
            <button
              type="button"
              className="cf__again link-line"
              onClick={() => {
                setSent(false);
                setFlight(null);
                setEmail("");
              }}
              data-cursor="grow"
            >
              Send another
            </button>
          </div>
        </section>
      ) : (
        <form
          ref={form}
          className={`cf__letter ${flight ? "is-flying" : ""}`}
          onSubmit={submit}
        >
          <p className="cf__line">
            Hi Advik, I&apos;m{" "}
            <input
              className="cf__field"
              name="name"
              required
              placeholder="your name"
              autoComplete="name"
              aria-label="Your name"
            />{" "}
            from{" "}
            <input
              className="cf__field"
              name="company"
              placeholder="company (optional)"
              autoComplete="organization"
              aria-label="Company"
            />{" "}
            based in{" "}
            <select
              className="cf__field cf__select"
              name="country"
              defaultValue=""
              aria-label="Your country"
            >
              <option value="" disabled>
                your country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </p>

          <div className="cf__line cf__line--chips">
            <span>I need help with</span>
            <ChipGroup
              name="What you need"
              options={NEEDS}
              value={needs}
              multi
              onChange={setNeeds}
            />
          </div>

          <div className="cf__line cf__line--chips">
            <span>and I&apos;d like it</span>
            <ChipGroup
              name="Timeline"
              options={TIMELINES}
              value={timeline}
              onChange={setTimeline}
            />
          </div>

          <label className="cf__line cf__line--block">
            <span>Here&apos;s the idea:</span>
            <textarea
              className="cf__area"
              name="message"
              required
              rows={4}
              placeholder="What are you building, who is it for, and what does done look like?"
            />
          </label>

          <p className="cf__line">
            You can reach me at{" "}
            <input
              className="cf__field cf__field--wide"
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              autoComplete="email"
              aria-label="Your email"
              list="email-suggestions"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <datalist id="email-suggestions">
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>{" "}
            or{" "}
            <input
              className="cf__field"
              type="tel"
              name="phone"
              placeholder="phone (optional)"
              autoComplete="tel"
              aria-label="Your phone number"
            />
          </p>

          <div className="cf__line cf__submit">
            <button
              type="submit"
              className="cf__send"
              disabled={!!flight}
              data-cursor="grow"
            >
              <span>Send it</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="cf__plane">
                <path d="M3 11.5 21 3l-6.5 18-3.2-7.3L3 11.5Z" />
                <path d="m11.3 13.7 4-4" />
              </svg>
            </button>
            <p className="cf__alt">
              Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              {SOCIALS.map((s) => (
                <span key={s.href}>
                  {" · "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </form>
      )}
      {flight && <SendAnimation flight={flight} onDone={landed} />}
    </main>
  );
}
