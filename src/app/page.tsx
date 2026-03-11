import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Interests from "./components/Interests";
import Family from "./components/Family";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-dark min-h-screen text-white">
      <NavBar />
      <Hero />
      <Metrics />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Testimonials />
      <Interests />
      <Family />
      <Contact />
      <Footer />
    </main>
  );
}
