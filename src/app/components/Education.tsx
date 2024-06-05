// components/Education.js
import React from "react";

const Education = () => {
  const educations = [
    {
      degree: "Executive Masters of Business Administration",
      field: "Management Information System",
      institution: "University of Dhaka",
      year: "2024",
      institutionLink: "https://www.du.ac.bd",
      fieldLink: "http://www.mis.du.ac.bd",
    },
    // Add other educations similarly
  ];

  return (
    <section className="p-3 lg:p-5 flex items-center" id="education">
      <div className="w-full">
        <h2 className="mb-5 text-3xl font-bold">Education</h2>
        {educations.map((edu, index) => (
          <div
            key={index}
            className="resume-item flex flex-col md:flex-row justify-between mb-5"
          >
            <div className="resume-content">
              <h3 className="mb-0 text-xl font-semibold">
                <a href={edu.institutionLink} className="text-primary">
                  {edu.institution}
                </a>
              </h3>
              <div className="subheading mb-3">{edu.degree}</div>
              <div>
                <a href={edu.fieldLink} className="text-primary">
                  {edu.field}
                </a>
              </div>
            </div>
            <div className="resume-date text-md-right text-primary">
              <span>{edu.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
