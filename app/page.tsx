import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#F2EDE4" }}>
      <LoadingScreen />
      <Navbar />
      <Hero />
    </main>
  );
}
