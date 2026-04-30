import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import SecondSection from "@/components/SecondSection";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#ede8df" }}>
      <LoadingScreen />
      <Navbar />
      <Hero />
      <SecondSection />
    </main>
  );
}
