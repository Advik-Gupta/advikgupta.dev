import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Blog · Advik Gupta",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return (
    <ComingSoon
      title="Blog"
      line="Notes on building things: backends, frontends and everything in between. First posts are on the way."
    />
  );
}
