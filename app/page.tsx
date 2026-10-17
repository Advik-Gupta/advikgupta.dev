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
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <main style={{ backgroundColor: "#ede8df" }}>
        <LoadingScreen />
        <Hero />
        <Gallery />
        <Story />
        <Numbers />
        <Works />
        <Journey />
        <Explore />
        <Toolbox />
        <Contact />
      </main>
      <Underneath />
    </>
  );
}
