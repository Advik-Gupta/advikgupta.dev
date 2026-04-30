"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
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
