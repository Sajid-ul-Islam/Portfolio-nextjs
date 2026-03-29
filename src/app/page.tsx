import "./styles.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Interests from "./components/Interests";
import Awards from "./components/Awards";
import Projects from "./components/Projects";

import VSCodeIDE from "./components/vscode/VSCodeIDE";

export default function Home() {
  return (
    <VSCodeIDE>
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="interests">
        <Interests />
      </section>
      <section id="awards">
        <Awards />
      </section>
      <section id="projects">
        <Projects />
      </section>
    </VSCodeIDE>
  );
}
