import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Interests from "./components/Interests";  // Combined Interests & Awards
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-dark min-h-screen text-white">
      <NavBar />
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Interests />
      <Footer />
    </main>
  );
}
