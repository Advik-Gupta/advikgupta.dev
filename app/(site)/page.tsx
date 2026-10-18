import LoadingScreen from "@/components/layout/LoadingScreen";
import Underneath from "@/components/layout/Underneath";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Story from "@/components/sections/Story";
import Numbers from "@/components/sections/Numbers";
import Works from "@/components/sections/Works";
import Journey from "@/components/sections/Journey";
import Explore from "@/components/sections/Explore";
import Toolbox from "@/components/sections/Toolbox";
import WorkTogether from "@/components/sections/WorkTogether";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/ui/JsonLd";
import { homeGraph } from "@/lib/jsonld";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: DEFAULT_TITLE,
  absoluteTitle: true,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <main id="main" style={{ backgroundColor: "#ede8df" }}>
        <LoadingScreen />
        <Hero />
        <Gallery />
        <Story />
        <Numbers />
        <Works />
        <Journey />
        <Explore />
        <Toolbox />
        <WorkTogether />
        <Contact />
      </main>
      <Underneath />
    </>
  );
}
