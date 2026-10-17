import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Projects · Advik Gupta",
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return (
    <ComingSoon
      title="Projects"
      line="Every project I've built, with the stories behind them. Being put together right now."
    />
  );
}
