"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import TextRotate, { TextRotateRef } from "./TextRotate";
import NumberTicker, { NumberTickerRef } from "./NumberTicker";

import "./LoadingScreen.css";

export default function LoadingScreen() {
  const textRef = useRef<TextRotateRef>(null);
  const tickerRef = useRef<NumberTickerRef>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    tickerRef.current?.startAnimation();

    const t1 = setTimeout(() => textRef.current?.next(), 1500);
    const t2 = setTimeout(() => textRef.current?.next(), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleComplete = useCallback(() => {
    setTimeout(() => setDone(true), 1000);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center px-6"
          style={{ backgroundColor: "#EDE8DF" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
        >
          <LayoutGroup>
            <motion.div
              layout
              className="flex flex-col items-center text-center gap-3"
            >
              <motion.p
                layout
                className="
                  leading-none tracking-wide uppercase text-black
                  text-[clamp(2.4rem,8.5vw,7rem)]
                "
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                creating incredible
              </motion.p>

              <TextRotate
                ref={textRef}
                texts={["websites", "experiences", "presence"]}
                auto={false}
                loop={false}
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                mainClassName="
                  text-[clamp(4.4rem,12.5vw,10rem)]
                  leading-none tracking-wide uppercase
                  text-white bg-[#FF7A2C]
                  highlighted-word
                  rounded-[0.15em]
                  overflow-hidden justify-center
                "
                splitLevelClassName="overflow-visible   "
                style={{ fontFamily: "var(--font-bebas)" }}
              />
            </motion.div>
          </LayoutGroup>

          <div
            className="
              mt-10 sm:mt-14
              flex items-baseline gap-[0.04em]
              text-[clamp(1.3rem,3vw,2.2rem)]
              font-medium tracking-tight text-black
            "
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <NumberTicker
              ref={tickerRef}
              from={0}
              target={100}
              autoStart={false}
              transition={{ duration: 4, type: "tween", ease: "easeInOut" }}
              onComplete={handleComplete}
            />
            <span>%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
