import ComingSoon from "@/components/ui/ComingSoon";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Hackathons",
    description:
      "Hackathon wins by Advik Gupta and the 48-hour stories behind them. Write-ups are on the way.",
    path: "/hackathons",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <ComingSoon
      title="Hackathons"
      line="Weekend sprints, late-night demos and the occasional win. Write-ups landing soon."
    />
  );
}
