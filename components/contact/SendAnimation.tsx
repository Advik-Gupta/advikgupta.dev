"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import "./SendAnimation.css";

export type Sent = { rect: DOMRect; name: string; message: string };

const RECT = "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%)";
const PLANE = "polygon(0% 0%, 100% 50%, 100% 50%, 100% 50%, 0% 100%, 28% 50%)";

export default function SendAnimation({
  flight,
  onDone,
}: {
  flight: Sent;
  onDone: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [time] = useState(() =>
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      lockScroll();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 640;
      const r = flight.rect;
      const top = Math.max(r.top, 0);
      const bottom = Math.min(r.bottom, vh);
      const start = {
        x: r.left,
        y: top,
        w: r.width,
        h: Math.max(160, bottom - top),
      };
      const plane = { w: mobile ? 120 : 170, h: mobile ? 70 : 96 };

      const sheet = el.querySelector<HTMLElement>(".sa__sheet");
      const phone = el.querySelector<HTMLElement>(".sa__phone");
      const screen = el.querySelector<HTMLElement>(".sa__screen");
      if (!sheet || !phone || !screen) return;

      gsap.set(sheet, {
        left: start.x,
        top: start.y,
        width: start.w,
        height: start.h,
        clipPath: RECT,
      });
      gsap.set(phone, { yPercent: 130, rotation: 8 });

      const tl = gsap.timeline({
        onComplete: () => {
          unlockScroll();
          onDone();
        },
      });

      tl.to(sheet, {
        left: vw / 2 - plane.w * 0.9,
        top: vh / 2 - plane.h,
        width: plane.w * 1.8,
        height: plane.h * 2,
        rotation: -4,
        duration: 0.7,
        ease: "power3.inOut",
      })
        .to(
          ".sa__crease",
          { scaleX: 1, duration: 0.25, ease: "power2.out" },
          "-=0.1",
        )
        .to(sheet, {
          height: plane.h,
          top: vh / 2 - plane.h / 2,
          duration: 0.35,
          ease: "power2.inOut",
        })
        .to(sheet, {
          clipPath: PLANE,
          width: plane.w,
          left: vw / 2 - plane.w / 2,
          rotation: 0,
          duration: 0.45,
          ease: "power3.inOut",
        })
        .to(".sa__lines", { opacity: 0, duration: 0.2 }, "<")
        .to(
          phone,
          { yPercent: 0, rotation: -6, duration: 0.8, ease: "expo.out" },
          "-=0.2",
        );

      tl.add(() => {
        const p = phone.getBoundingClientRect();
        const s = screen.getBoundingClientRect();
        const tx = s.left + s.width / 2 - plane.w / 2;
        const ty = s.top + s.height * 0.3 - plane.h / 2;
        const midX = (vw / 2 + tx) / 2;
        const lift = Math.min(p.top, vh * 0.25);
        gsap
          .timeline()
          .to(sheet, {
            keyframes: [
              {
                left: midX - plane.w / 2 - 80,
                top: lift,
                rotation: -28,
                duration: 0.45,
                ease: "sine.out",
              },
              {
                left: midX + 40,
                top: lift - 30,
                rotation: 30,
                duration: 0.35,
                ease: "sine.inOut",
              },
              {
                left: tx,
                top: ty,
                rotation: 52,
                scale: 0.35,
                duration: 0.5,
                ease: "power2.in",
              },
            ],
          })
          .to(sheet, { opacity: 0, duration: 0.12 }, "-=0.08");
      });

      tl.to({}, { duration: 1.32 })
        .to(phone, {
          keyframes: [
            { rotation: -9, duration: 0.05 },
            { rotation: -3, duration: 0.05 },
            { rotation: -8, duration: 0.05 },
            { rotation: -4, duration: 0.05 },
            { rotation: -6, duration: 0.05 },
          ],
        })
        .fromTo(
          ".sa__note",
          { yPercent: -140, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: "back.out(1.6)" },
          "<",
        )
        .to(
          ".sa__caption",
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "<0.2",
        )
        .to({}, { duration: 1.6 })
        .to(phone, {
          yPercent: 130,
          rotation: 10,
          duration: 0.6,
          ease: "power3.in",
        })
        .to(".sa__caption", { opacity: 0, duration: 0.3 }, "<")
        .to(el, { opacity: 0, duration: 0.25 });

      return () => unlockScroll();
    },
    { scope: root },
  );

  const preview = flight.message.trim().slice(0, 70);

  return (
    <div className="sa" ref={root} aria-hidden="true">
      <div className="sa__sheet">
        <span className="sa__lines" />
        <span className="sa__crease" />
      </div>

      <p className="sa__caption display">Delivered.</p>

      <div className="sa__phone">
        <div className="sa__screen">
          <span className="sa__notch" />
          <span className="sa__time">{time}</span>
          <span className="sa__date">Advik&apos;s phone</span>
          <div className="sa__note">
            <span className="sa__app">A</span>
            <span className="sa__note-body">
              <span className="sa__note-head">
                <b>advikgupta.dev</b>
                <i>now</i>
              </span>
              <b className="sa__note-title">
                New message{flight.name ? ` from ${flight.name}` : ""}
              </b>
              <span className="sa__note-text">
                {preview}
                {flight.message.length > 70 ? "…" : ""}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
