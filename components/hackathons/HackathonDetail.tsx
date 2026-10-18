"use client";

import { useCallback, useRef } from "react";
import Overlay from "@/components/ui/Overlay";
import type { Hackathon } from "./data";
import "./HackathonDetail.css";

type Props = {
  hack: Hackathon;
  index: number;
  origin: DOMRect | null;
  closing: boolean;
  onRequestClose: () => void;
  onClosed: () => void;
};

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

function Fill({ text }: { text: string }) {
  if (!text.startsWith("Placeholder")) return <>{text}</>;
  return (
    <span className="hd-ph">
      <span className="hd-ph__tag">To fill</span>
      {text.replace(/^Placeholder:?\s*/, "")}
    </span>
  );
}

export default function HackathonDetail({
  hack,
  index,
  origin,
  closing,
  onRequestClose,
  onClosed,
}: Props) {
  const clock = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const minutes = hack.timeline.map((t) => toMinutes(t.time));

  const onScroll = useCallback(
    (box: HTMLDivElement) => {
      const ol = list.current;
      if (!ol) return;
      const items = Array.from(ol.children) as HTMLElement[];
      const mid = box.getBoundingClientRect().top + box.clientHeight * 0.55;
      let i = -1;
      items.forEach((el, n) => {
        if (el.getBoundingClientRect().top <= mid) i = n;
      });
      let value = 0;
      if (i >= 0) {
        const a = items[i].getBoundingClientRect().top;
        const next = items[i + 1];
        const b = next ? next.getBoundingClientRect().top : a + 1;
        const t = next ? Math.min(1, Math.max(0, (mid - a) / (b - a))) : 0;
        value = minutes[i] + ((minutes[i + 1] ?? minutes[i]) - minutes[i]) * t;
      }
      if (clock.current)
        clock.current.textContent = `${pad(value / 60)}:${pad(value % 60)}`;
      if (fill.current) {
        const r = ol.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        fill.current.style.transform = `scaleY(${p})`;
      }
      items.forEach((el, n) => el.classList.toggle("is-past", n <= i));
    },
    [minutes],
  );

  const words = hack.project.split(" ");

  return (
    <Overlay
      label={`${hack.project} at ${hack.event}`}
      origin={origin}
      closing={closing}
      onRequestClose={onRequestClose}
      onClosed={onClosed}
      onScroll={onScroll}
      className="hd"
    >
      <div className="hd__inner">
        <header className="hd__bar">
          <span className="hd__crumb">
            Hackathons <span>/</span> {String(index + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="hd__close"
            onClick={onRequestClose}
            data-cursor="grow"
          >
            <span className="hd__close-label">Close</span>
            <span className="hd__close-x" aria-hidden="true">
              ×
            </span>
          </button>
        </header>

        <section className="hd__hero">
          <span className="hd__stamp ov-reveal" aria-hidden="true">
            <span>{hack.placement}</span>
            <small>{hack.year}</small>
          </span>
          <p className="hd__event ov-reveal">{hack.event}</p>
          <h2 className="hd__title display">
            {words.map((w, i) => (
              <span key={i} className="hd__word">
                <span className="ov-word">{w}</span>
              </span>
            ))}
          </h2>
          <p className="hd__hook ov-reveal">{hack.hook}</p>

          <dl className="hd__meta ov-reveal">
            <div>
              <dt>Placement</dt>
              <dd>{hack.placement}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{hack.duration}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>
                <Fill text={hack.team} />
              </dd>
            </div>
            <div>
              <dt>Links</dt>
              <dd className="hd__links">
                {hack.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="grow"
                  >
                    {l.label} ↗
                    {l.href === "#" && (
                      <span className="hd-ph__tag">To fill</span>
                    )}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        <section className="hd__pair ov-reveal">
          <div>
            <h3 className="hd__label">The brief</h3>
            <p className="hd__text">
              <Fill text={hack.brief} />
            </p>
          </div>
          <div>
            <h3 className="hd__label">What we built</h3>
            <p className="hd__text">
              {hack.built.includes("Placeholder") ? (
                <>
                  {hack.built.split("Placeholder")[0]}
                  <Fill
                    text={`Placeholder${hack.built.split("Placeholder")[1]}`}
                  />
                </>
              ) : (
                hack.built
              )}
            </p>
            <ul className="hd__stack">
              {hack.stack.map((s) => (
                <li key={s} className={s === "Placeholder" ? "is-ph" : ""}>
                  {s === "Placeholder" ? "+ to fill" : s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="hd__hours">
          <div className="hd__clock-col">
            <div className="hd__clock">
              <span className="hd__clock-label">T+</span>
              <span className="hd__clock-value" ref={clock}>
                00:00
              </span>
              <span className="hd__clock-of">of {hack.duration}</span>
            </div>
          </div>
          <div>
            <h3 className="hd__label">The {hack.duration}</h3>
            <div className="hd__track">
              <span className="hd__track-line" aria-hidden="true">
                <span ref={fill} />
              </span>
              <ol className="hd__log" ref={list}>
                {hack.timeline.map((t) => (
                  <li key={t.time}>
                    <span className="hd__time">{t.time}</span>
                    <p>
                      <Fill text={t.text} />
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="hd__gallery-wrap">
          <h3 className="hd__label">Photos</h3>
          <div className="hd__gallery">
            {hack.gallery.map((g, i) => (
              <figure key={i} className={`hd__shot hd__shot--${i % 3}`}>
                <div className="hd__frame">
                  <span>Add photo</span>
                </div>
                <figcaption>
                  <Fill text={g.replace(" · ", ": ")} />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className="hd__next">
          <span className="hd__next-label">Next hackathon</span>
          <span className="hd__next-title display">Loading…</span>
          <button
            type="button"
            className="hd__back"
            onClick={onRequestClose}
            data-cursor="grow"
          >
            ← Back to the rail
          </button>
        </footer>
      </div>
    </Overlay>
  );
}
