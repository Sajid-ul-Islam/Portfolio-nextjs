import React from "react";
import { FaProjectDiagram } from "react-icons/fa";

const projects = [
  {
    title: "My Portfolio with Bootstrap",
    link: "https://saajiidi.github.io/",
  },
  {
    title: "My Portfolio with React App & TypeScript",
    link: "https://saajiidi.github.io/portfolio/",
  },
  {
    title: "My Portfolio with Next JS & Tailwind CSS",
    link: "https://sajid-islam-portfolio.vercel.app/",
  },

  {
    title: "E-Commerce Interface with React JS",
    link: "https://gear-master.vercel.app/",
  },

  {
    title: "LMS Interface with React JS",
    link: "https://altenaitve-school.vercel.app/",
  },
];

const Projects = () => {
  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="projects"
    >
      <div className="w-full max-w-4xl">
        <h2 className="mb-5 text-4xl font-bold text-left">Projects</h2>
        {projects.map((project, index) => (
          <div
            key={index}
            className="mb-5 p-5 rounded-lg shadow-lg bg-black"
          >
            <div className="flex items-center mb-3">
              <FaProjectDiagram className="text-warning mr-3" />
              <h3 className="text-xl font-semibold text-primary">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
