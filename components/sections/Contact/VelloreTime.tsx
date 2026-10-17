"use client";

import { useEffect, useState } from "react";

export default function VelloreTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="contact__time">
      Vellore <span className="contact__time-sep">·</span>{" "}
      <span suppressHydrationWarning>{time || "--:--"}</span> IST
    </span>
  );
}
