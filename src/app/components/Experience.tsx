// components/Experience.js
import React from "react";

const Experience = () => {
  const experiences = [
    {
      title: "Jr. Executive - Marketplace",
      company: "Daraz - Alibaba Group",
      tasks: [
        "Business & Marketplace Analysis",
        "Brand & Partner Acquisition",
        "Partner Development Project",
      ],
      date: "January 2020 - January 2022",
      companyLink: "https://www.daraz.com.bd",
    },
    // Add other experiences similarly
  ];

  return (
    <section
      className="p-3 lg:p-5 flex flex-col justify-center"
      id="experience"
    >
      <div className="w-full">
        <h2 className="mb-5 text-3xl font-bold">Experience</h2>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="resume-item flex flex-col md:flex-row justify-between mb-5"
          >
            <div className="resume-content">
              <h3 className="mb-0 text-xl font-semibold">{exp.title}</h3>
              <div className="subheading mb-3">
                <a href={exp.companyLink} className="text-primary">
                  {exp.company}
                </a>
              </div>
              <ul className="list-disc ml-5">
                {exp.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
            <div className="resume-date text-md-right text-primary">
              <span>{exp.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
