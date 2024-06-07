// pages/index.tsx
import "./styles.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Interests from "./components/Interests";
import Awards from "./components/Awards";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row">
      <NavBar />
      <main className="container">
        <div className="">
          <About />
          <Experience />
          <Education />
          <Skills />
          <Interests />
          <Awards />
          <Projects />
        </div>
      </main>
    </div>
  );
}
