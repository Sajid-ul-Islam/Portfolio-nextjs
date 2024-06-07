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
    {
      title: "Associate - Home Kitchen & Street Food",
      company: "HungryNaki - Alibaba Group",
      tasks: [
        "Business & Marketplace Analysis",
        "Brand & Partner Acquisition",
        "Partner Development Project",
      ],
      date: "July 2021 - January 2022",
      companyLink: "https://hungrynaki.com",
      companyLink2: "https://www.alibaba.com",
    },
    {
      title: "IT Executive - Quality Control",
      company: "NZ Fabrics - NZ TEXTILE GROUP",
      tasks: [
        "Info & Tech Support to the Quality Control Team",
        "Associating with the Research & Development Team",
        "Presentation & Reporting to the Authorities & Buyers",
      ],
      date: "April 2023 - May 2023",
      companyLink: "https://nztexgroup.com",
      companyLink2: "https://www.linkedin.com/company/nztexgroup/",
    },
    {
      title: "Associate - Online Sales & Customer Supports",
      company: "Thriving Skill",
      tasks: [
        "Business & Marketplace Analysis",
        "Sales Growth Strategies",
        "Customer Relationship Management",
      ],
      date: "June 2023 - June 2024",
      companyLink: "https://thrivingskill.com",
    },
    {
      title: "Co-Founder",
      company: "Gear Master",
      tasks: ["Bike Accessories Retail Shop"],
      date: "April 2024 - Present",
      companyLink: "https://www.facebook.com/profile.php?id=61558077623189",
    },
  ];

  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="experience"
    >
      <div className="w-full max-w-4xl">
        <h2 className="mb-5 text-4xl font-bold text-left">Experience</h2>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="resume-item flex flex-col md:flex-row justify-between mb-5 p-5 rounded-lg shadow-lg bg-black"
          >
            <div className="resume-content">
              <h3 className="mb-1 text-xl font-semibold">{exp.title}</h3>
              <div className="subheading mb-3">
                <a
                  href={exp.companyLink}
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exp.company}
                </a>
              </div>
              <div className="md:ml-5">
                {" "}
                {/* Added margin for mobile view */}
                {exp.tasks.map((task, i) => (
                  <div key={i} className="mb-2">
                    • {task}
                  </div>
                ))}
              </div>
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
