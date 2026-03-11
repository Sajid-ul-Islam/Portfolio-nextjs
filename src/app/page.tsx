import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Insights from "./components/Insights";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen text-ink">
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Insights />
      <Contact />
      <Footer />
    </main>
  );
}
