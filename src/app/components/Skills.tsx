import React from "react";
import {
  FaCheck,
  FaCode,
  FaDatabase,
  FaChartLine,
  FaTools,
  FaProjectDiagram,
} from "react-icons/fa";

const Skills = () => {
  const skills = [
    { name: "Digital Sales & Marketing", icon: FaChartLine },
    { name: "Data Analysis & Reporting", icon: FaDatabase },
    { name: "Market Analysis & Research", icon: FaChartLine },
    { name: "Product Development & Management", icon: FaProjectDiagram },
  ];

  const tools = [
    { name: "React & NEXT JS", icon: FaCode },
    { name: "Bootstrap & Tailwind CSS", icon: FaTools },
    { name: "SQL, PANDAS & Matplotlib with Python", icon: FaDatabase },
    { name: "Excel & Power BI", icon: FaChartLine },
  ];

  const workflows = [
    { name: "Cross Functional Teams", icon: FaCheck },
    { name: "Agile Development & Scrum", icon: FaCheck },
  ];

  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="skills"
    >
      <div className="w-full max-w-4xl">
        <div className="mb-5 w-full p-5 rounded-lg shadow-lg bg-black">
          <h3 className="text-3xl font-semibold mb-3 text-primary text-left">
            Core Skills
          </h3>
          <ul className="space-y-2">
            <p>
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <skill.icon className="text-primary mr-3" />
                  {skill.name}
                </li>
              ))}
            </p>
          </ul>
        </div>

        <div className="mb-5 w-full p-5 rounded-lg shadow-lg bg-black">
          <h3 className="text-3xl font-semibold mb-3 text-primary text-left">
            Tools & Frameworks
          </h3>
          <ul className="space-y-2">
            {" "}
            <p>
              {tools.map((tool, index) => (
                <li key={index} className="flex items-center">
                  <tool.icon className="text-primary mr-3" />
                  {tool.name}
                </li>
              ))}{" "}
            </p>
          </ul>
        </div>

        <div className="mb-5 w-full p-5 rounded-lg shadow-lg bg-black">
          <h3 className="text-3xl font-semibold mb-3 text-primary text-left">
            Workflow
          </h3>
          <ul className="space-y-2">
            <p>
              {workflows.map((workflow, index) => (
                <li key={index} className="flex items-center">
                  <workflow.icon className="text-primary mr-3" />
                  {workflow.name}
                </li>
              ))}
            </p>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
