import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import WristWrapsSection from "@/components/WristWrapsSection";
import { CompareSection } from "@/components/Sections";
import ProductDrawer from "@/components/ProductDrawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <Hero />
      <VideoSection />
      <WristWrapsSection />
      <CompareSection />


      {/* Global Drawer */}
      <ProductDrawer />

      <footer className="py-12 text-center text-sm text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
        <p>&copy; 2026 RugXFIT. All rights reserved.</p>
      </footer>
    </main>
  );
}
