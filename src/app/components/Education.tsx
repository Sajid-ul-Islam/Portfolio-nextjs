import React from "react";

const Education = () => {
  const educations = [
    
    {
      degree: "Postgraduate Diploma",
      field: "Data Science & Business Analytics",
      institution: "Academy of Business Professionals",
      year: "2024",
      institutionLink: "https://abpbd.org/",
      fieldLink: "https://abpbd.org/pgddsba/",
    },
    
    
    {
      degree: "Executive Masters of Business Administration",
      field: "Management Information System",
      institution: "University of Dhaka",
      year: "2021 (Drop Out",
      institutionLink: "https://www.du.ac.bd",
      fieldLink: "http://www.mis.du.ac.bd",
    },
    {
      degree: "Bachelor of Science",
      field: "Computer Science & Engineering",
      institution: "North South University",
      year: "2019",
      institutionLink: "http://ece.northsouth.edu",
      fieldLink: "http://ece.northsouth.edu",
    },
    {
      degree: "Higher Secondary School",
      field: "Science Division",
      institution: "BAF Shaheen College Dhaka",
      year: "2013",
      institutionLink: "https://bafsd.edu.bd",
      fieldLink: "",
    },
    {
      degree: "Secondary School",
      field: "Science Division",
      institution: "Uttara High School & College",
      year: "2011",
      institutionLink: "https://uhscdhaka.edu.bd",
      fieldLink: "",
    },
  ];

  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="education"
    >
      <div className="w-full max-w-4xl">
        <h2 className="mb-5 text-4xl font-bold text-left">Education</h2>
        {educations.map((edu, index) => (
          <div
            key={index}
            className="resume-item flex flex-col md:flex-row justify-between mb-5 p-5 rounded-lg shadow-lg bg-black"
          >
            <div className="resume-content">
              <h3 className="mb-1 text-xl font-semibold">
                <a
                  href={edu.institutionLink}
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {edu.institution}
                </a>
              </h3>
              <div className="subheading mb-1 text-lg">{edu.degree}</div>
              <div>
                {edu.fieldLink ? (
                  <a
                    href={edu.fieldLink}
                    className="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {edu.field}
                  </a>
                ) : (
                  <span>{edu.field}</span>
                )}
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
