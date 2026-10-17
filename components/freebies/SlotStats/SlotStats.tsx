"use client";

import { useEffect, useRef, useState } from "react";
import "./SlotStats.css";

export type Stat = {
  value: string;
  caption: string;
  prefix?: string;
  suffix?: string;
  tone?: "ink" | "accent" | "soft" | "outline";
};

const CELLS = Array.from({ length: 20 }, (_, i) => i % 10);

function Digit({ char, index }: { char: string; index: number }) {
  if (!/\d/.test(char)) return <span className="ss__char">{char}</span>;
  return (
    <span
      className="ss__roll"
      style={
        {
          "--d": Number(char),
          "--delay": `${index * 0.12}s`,
          "--dur": `${1.4 + index * 0.35}s`,
        } as React.CSSProperties
      }
    >
      <span className="ss__ghost">{char}</span>
      <span className="ss__strip">
        {CELLS.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </span>
    </span>
  );
}

export default function SlotStats({ stats }: { stats: Stat[] }) {
  const root = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ss-wrap">
      <ul ref={root} className={`ss ${visible ? "is-in" : ""}`}>
        {stats.map((s, i) => (
          <li
            key={s.caption}
            className={`ss__tile ss__tile--${s.tone ?? "ink"}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <p
              className="ss__num"
              aria-label={`${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`}
            >
              {s.prefix && <span className="ss__affix">{s.prefix}</span>}
              {s.value.split("").map((c, j) => (
                <Digit key={j} char={c} index={j} />
              ))}
              {s.suffix && <span className="ss__affix">{s.suffix}</span>}
            </p>
            <p className="ss__caption">{s.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
