// components/Awards.js
import React from "react";

const Awards = () => {
  const awards = [
    "Google Analytics Certified Developer",
    "Mobile Web Specialist - Google Certification",
    "1st Place - University of Dhaka Thesis Paper Presentation",
    "2nd Place - University of Dhaka Hackathon",
  ];

  return (
    <section className="p-3 lg:p-5 flex items-center" id="awards">
      <div className="w-full">
        <h2 className="mb-5 text-3xl font-bold">Awards & Certifications</h2>
        <ul className="fa-ul mb-0 list-disc ml-5">
          {awards.map((award, index) => (
            <li key={index}>
              <i className="fa-li fa fa-trophy text-warning"></i>
              {award}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Awards;
