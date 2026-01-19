import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="min-h-screen bg-ink text-zinc-50">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
