// components/Skills.js
import React from "react";

const Skills = () => {
  const skills = [
    "Digital Sales & Marketing",
    "Data Analysis & Reporting",
    "Market Analysis & Research",
    "Product Development & Management",
  ];

  const tools = [
    { name: "React", icon: "fab fa-react" },
    { name: "SQL", icon: "fas fa-database" },
    { name: "Power BI", icon: "fas fa-chart-line" },
    { name: "Excel", icon: "fas fa-file-excel" },
    { name: "NumPy", icon: "fas fa-square-root-alt" },
    { name: "Matplotlib", icon: "fas fa-chart-bar" },
    { name: "Ubuntu", icon: "fab fa-ubuntu" },
  ];

  const workflows = ["Cross Functional Teams", "Agile Development & Scrum"];

  return (
    <section className="p-3 lg:p-5 flex items-center" id="skills">
      <div className="w-full">
        <h2 className="mb-5 text-3xl font-bold">Skills</h2>
        <ul className="fa-ul mb-5 list-disc ml-5">
          {skills.map((skill, index) => (
            <li key={index}>
              <i className="fa-li fa fa-check"></i>
              {skill}
            </li>
          ))}
        </ul>
        <div className="subheading mb-3">
          Tools & Frameworks I have been learning & working on...
        </div>
        <ul className="list-inline mb-5 flex flex-wrap">
          {tools.map((tool, index) => (
            <li
              key={index}
              className="list-inline-item m-2 text-2xl"
              title={tool.name}
            >
              <i className={tool.icon}></i>
            </li>
          ))}
        </ul>
        <div className="subheading mb-3">Workflow</div>
        <ul className="fa-ul mb-0 list-disc ml-5">
          {workflows.map((workflow, index) => (
            <li key={index}>
              <i className="fa-li fa fa-check"></i>
              {workflow}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
