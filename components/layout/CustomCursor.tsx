"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [grow, setGrow] = useState(false);
  const [down, setDown] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as Element | null;
      setGrow(!!target?.closest?.("a, button, [data-cursor='grow'], .pill"));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      animate={{ scale: down ? 0.7 : grow ? 2.6 : 1, opacity: grow ? 0.55 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: "#FF7A2C",
        pointerEvents: "none",
        zIndex: 99999,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
