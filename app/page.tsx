import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Story from "@/components/sections/Story";
import Numbers from "@/components/sections/Numbers";
import Works from "@/components/sections/Works";
import Journey from "@/components/sections/Journey";
import Toolbox from "@/components/sections/Toolbox";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#ede8df" }}>
      <LoadingScreen />
      <Navbar />
      <Hero />
      <Gallery />
      <Story />
      <Numbers />
      <Works />
      <Journey />
      <Toolbox />
      <Contact />
    </main>
  );
}
