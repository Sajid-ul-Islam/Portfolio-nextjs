// components/Projects.js
import React from "react";

const Projects = () => {
  const projects = [
    {
      title: "LMS - System Analysis, Design, & Implementation",
      description:
        "This project is aimed at creating a user-friendly Learning Management System to assist students and educators.",
      link: "#",
    },
    {
      title: "General Store Database System",
      description:
        "Developed a comprehensive database system for managing a general store’s inventory and sales.",
      link: "#",
    },
    // Add other projects similarly
  ];

  return (
    <section className="p-3 lg:p-5 flex items-center" id="projects">
      <div className="w-full">
        <h2 className="mb-5 text-3xl font-bold">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="resume-item flex flex-col mb-5">
            <div className="resume-content">
              <h3 className="mb-0 text-xl font-semibold">
                <a href={project.link} className="text-primary">
                  {project.title}
                </a>
              </h3>
              <p className="mb-0">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
