"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ScrollTrigger } from "@/lib/gsap";
import { countLines, highlight } from "@/lib/highlight";
import "./Underneath.css";

type SourceFile = { path: string; code: string };
type Module = { name: string; selector: string; files: SourceFile[] };
type Box = { top: number; height: number };

export default function Underneath() {
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<Module[] | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [docHeight, setDocHeight] = useState(0);
  const busy = useRef(false);

  const rendered = useMemo(
    () =>
      modules?.map((m) => ({
        ...m,
        lines: m.files.reduce((n, f) => n + countLines(f.code), 0),
        files: m.files.map((f) => ({ ...f, html: highlight(f.code) })),
      })) ?? [],
    [modules],
  );

  const totalLines = rendered.reduce((n, m) => n + m.lines, 0);

  const measureWith = useCallback((mods: Module[]) => {
    setDocHeight(document.documentElement.scrollHeight);
    setBoxes(
      mods.map((m) => {
        const el = document.querySelector<HTMLElement>(m.selector);
        if (!el) return { top: 0, height: 0 };
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: el.offsetHeight };
      }),
    );
  }, []);

  const toggleRef = useRef<(next: boolean) => void>(() => {});

  useEffect(() => {
    if (!open || !modules) return;
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => measureWith(modules));
    });
    ro.observe(document.body);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleRef.current(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, modules, measureWith]);

  const load = async () => {
    if (modules) return modules;
    setLoading(true);
    try {
      const res = await fetch("/underneath");
      const data = (await res.json()) as { modules: Module[] };
      setModules(data.modules);
      return data.modules;
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (next: boolean) => {
    if (busy.current) return;
    busy.current = true;
    const mods = next ? await load() : modules;
    if (next && mods) measureWith(mods);

    const root = document.documentElement;
    const apply = () =>
      flushSync(() => {
        root.classList.toggle("xray", next);
        setOpen(next);
        setScanning(true);
      });

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const done = () => {
      setScanning(false);
      delete root.dataset.vt;
      busy.current = false;
      ScrollTrigger.refresh();
    };

    if (reduce) {
      apply();
      done();
      return;
    }

    root.dataset.vt = next ? "in" : "out";
    if (typeof document.startViewTransition === "function") {
      const t = document.startViewTransition(apply);
      t.finished.finally(done);
    } else {
      apply();
      window.setTimeout(done, 1100);
    }
  };

  useEffect(() => {
    toggleRef.current = toggle;
  });

  return (
    <>
      <button
        type="button"
        className={`xray-toggle ${open ? "is-open" : ""}`}
        onClick={() => toggle(!open)}
        aria-pressed={open}
        aria-label={open ? "Put the site back" : "Look underneath the site"}
        data-cursor="grow"
      >
        <svg
          className="xray-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
          <path className="xray-toggle__beam" d="M4 12h16" />
        </svg>
        <span className="xray-toggle__label">
          {loading ? "Scanning…" : open ? "Put it back" : "Look underneath"}
        </span>
        <span className="xray-toggle__dot" aria-hidden="true" />
      </button>

      {scanning && <div className="xray-scan" aria-hidden="true" />}

      {open && (
        <>
          <div className="xray-hud" aria-hidden="true">
            <span className="xray-hud__live" />
            <span>X-ray</span>
            <span className="xray-hud__sep">/</span>
            <span>{rendered.length} modules</span>
            <span className="xray-hud__sep">/</span>
            <span>{totalLines.toLocaleString("en-IN")} lines</span>
          </div>
          <div className="xray-crt" aria-hidden="true" />
          <div
            className="xray-board"
            style={{ height: docHeight }}
            aria-hidden="true"
          >
            <span className="xray-bus" />
            {rendered.map((m, i) => {
              const box = boxes[i];
              if (!box || !box.height) return null;
              return (
                <section
                  key={m.name}
                  className="xray-mod"
                  style={{ top: box.top + 10, height: box.height - 20 }}
                >
                  <span className="xray-node" />
                  <header className="xray-mod__head">
                    <span className="xray-mod__id">
                      MODULE {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="xray-mod__name">&lt;{m.name} /&gt;</span>
                    <span className="xray-mod__meta">
                      {m.files.length} files · {m.lines} lines
                    </span>
                  </header>
                  <div className="xray-mod__code">
                    {m.files.map((f) => (
                      <div key={f.path} className="xray-file">
                        <div className="xray-file__path">{f.path}</div>
                        <pre dangerouslySetInnerHTML={{ __html: f.html }} />
                      </div>
                    ))}
                  </div>
                  <span className="xray-screw xray-screw--tl" />
                  <span className="xray-screw xray-screw--tr" />
                  <span className="xray-screw xray-screw--bl" />
                  <span className="xray-screw xray-screw--br" />
                </section>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
