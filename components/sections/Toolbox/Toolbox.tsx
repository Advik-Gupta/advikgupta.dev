"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { GROUP_INFO, GROUPS, SKILLS } from "./skills";
import "./Toolbox.css";

export default function Toolbox() {
  const root = useRef<HTMLElement>(null);
  const pit = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const staticMode = useReducedMotion() === true;

  useEffect(() => {
    const container = pit.current;
    if (!container || staticMode) return;

    let disposed = false;
    let cleanup = () => {};

    import("matter-js").then((Matter) => {
      if (disposed) return;
      const { Engine, Bodies, Body, Composite, Constraint, Vector } = Matter;

      const pills = Array.from(
        container.querySelectorAll<HTMLElement>(".pill"),
      );
      let engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });
      let bodies: Matter.Body[] = [];
      let walls: Matter.Body[] = [];
      let width = 0;
      let height = 0;
      let raf = 0;
      let running = false;
      let started = false;
      let drag: { constraint: Matter.Constraint; id: number } | null = null;

      const build = () => {
        Composite.clear(engine.world, false);
        width = container.clientWidth;
        height = container.clientHeight;
        const t = 200;
        walls = [
          Bodies.rectangle(width / 2, height + t / 2, width * 3, t, {
            isStatic: true,
          }),
          Bodies.rectangle(-t / 2, height / 2 - height, t, height * 4, {
            isStatic: true,
          }),
          Bodies.rectangle(width + t / 2, height / 2 - height, t, height * 4, {
            isStatic: true,
          }),
        ];
        bodies = pills.map((el, i) => {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          const x = Math.min(
            width - w / 2 - 4,
            Math.max(w / 2 + 4, Math.random() * width),
          );
          const y = -h - i * (h * 0.9) - Math.random() * 40;
          return Bodies.rectangle(x, y, w, h, {
            chamfer: { radius: h / 2 - 1 },
            restitution: 0.35,
            friction: 0.12,
            frictionAir: 0.012,
            density: 0.0018,
            angle: (Math.random() - 0.5) * 0.9,
          });
        });
        Composite.add(engine.world, [...walls, ...bodies]);
      };

      const paint = () => {
        bodies.forEach((b, i) => {
          const el = pills[i];
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          el.style.transform = `translate3d(${b.position.x - w / 2}px, ${b.position.y - h / 2}px, 0) rotate(${b.angle}rad)`;
        });
      };

      const step = 1000 / 60;
      let last = performance.now();
      let acc = 0;
      const loop = (now: number) => {
        acc = Math.min(acc + now - last, step * 4);
        last = now;
        while (acc >= step) {
          Engine.update(engine, step);
          acc -= step;
        }
        paint();
        raf = requestAnimationFrame(loop);
      };

      const play = () => {
        if (running) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      };

      const pause = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      build();
      paint();
      setReady(true);

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            started = true;
            play();
          } else {
            pause();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(container);

      const local = (e: PointerEvent) => {
        const r = container.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };

      const onDown = (e: PointerEvent) => {
        const idx = pills.indexOf(e.currentTarget as HTMLElement);
        if (idx < 0) return;
        e.preventDefault();
        const body = bodies[idx];
        const p = local(e);
        const offset = Vector.rotate(Vector.sub(p, body.position), -body.angle);
        const constraint = Constraint.create({
          pointA: p,
          bodyB: body,
          pointB: offset,
          stiffness: 0.18,
          damping: 0.08,
          length: 0,
        });
        Composite.add(engine.world, constraint);
        drag = { constraint, id: e.pointerId };
        pills[idx].classList.add("is-grabbed");
        container.classList.add("is-dragging");
        play();
      };

      const onMove = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        drag.constraint.pointA = local(e);
      };

      const onUp = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        Composite.remove(engine.world, drag.constraint);
        drag = null;
        pills.forEach((p) => p.classList.remove("is-grabbed"));
        container.classList.remove("is-dragging");
      };

      pills.forEach((p) => p.addEventListener("pointerdown", onDown));
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);

      shakeRef.current = () => {
        play();
        bodies.forEach((b) => {
          Body.setVelocity(b, {
            x: (Math.random() - 0.5) * 22,
            y: -8 - Math.random() * 14,
          });
          Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.4);
        });
      };

      let lastWidth = container.clientWidth;
      const ro = new ResizeObserver(() => {
        if (Math.abs(container.clientWidth - lastWidth) < 2) return;
        lastWidth = container.clientWidth;
        Engine.clear(engine);
        engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });
        build();
        paint();
        if (started) play();
      });
      ro.observe(container);

      cleanup = () => {
        pause();
        io.disconnect();
        ro.disconnect();
        pills.forEach((p) => p.removeEventListener("pointerdown", onDown));
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        Engine.clear(engine);
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [staticMode]);

  useGSAP(
    () => {
      gsap.from(".toolbox__title .toolbox__word", {
        yPercent: 105,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".toolbox__title", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section className="toolbox" id="toolbox" ref={root}>
      <div className="toolbox__head">
        <h2 className="toolbox__title display" aria-label="The toolbox">
          <span className="toolbox__mask">
            <span className="toolbox__word">The</span>
          </span>{" "}
          <span className="toolbox__mask">
            <span className="toolbox__word hl">toolbox</span>
          </span>
        </h2>
        <div className="toolbox__hint">
          <p>
            {staticMode
              ? "Everything I build with."
              : "Go on, grab one and throw it."}
          </p>
          {!staticMode && (
            <button
              type="button"
              className="toolbox__shake"
              onClick={() => shakeRef.current()}
              data-cursor="grow"
            >
              Shake it
            </button>
          )}
        </div>
      </div>

      <div
        ref={pit}
        className={`toolbox__pit ${ready ? "is-ready" : ""} ${staticMode ? "is-static" : ""}`}
        aria-hidden="true"
      >
        {SKILLS.map((s) => (
          <span key={s.name} className={`pill pill--${s.tone}`}>
            {s.name}
          </span>
        ))}
      </div>

      <ol className="toolbox__list">
        {GROUPS.map((g) => (
          <li key={g} className="toolbox__group">
            <h3 className="toolbox__group-title display">
              {GROUP_INFO[g].title}
            </h3>
            <p className="toolbox__group-blurb">{GROUP_INFO[g].blurb}</p>
            <ul className="toolbox__tags">
              {SKILLS.filter((s) => s.group === g).map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
