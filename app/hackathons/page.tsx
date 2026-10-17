import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Hackathons · Advik Gupta",
  alternates: { canonical: "/hackathons" },
};

export default function Page() {
  return (
    <ComingSoon
      title="Hackathons"
      line="Weekend sprints, late-night demos and the occasional win. Write-ups landing soon."
    />
  );
}
