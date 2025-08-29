import "./styles.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import SkillsEnhanced from "./components/SkillsEnhanced";
import Interests from "./components/Interests";
import Awards from "./components/Awards";
import ProjectsEnhanced from "./components/ProjectsEnhanced";
import ContactForm from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      <main className="container mx-auto p-4">
        <div className="content-wrapper space-y-16">
          <About />
          <Experience />
          <Education />
          <SkillsEnhanced />
          <Interests />
          <Awards />
          <ProjectsEnhanced />
          <ContactForm />
        </div>
      </main>
      <ScrollToTop />
      <ThemeToggle />
    </div>
  );
}
