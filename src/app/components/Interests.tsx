// components/Interests.js
import React from "react";

const Interests = () => {
  const interests = [
    "Data Science",
    "Economics",
    "Business",
    "History",
    "Technology",
  ];

  return (
    <section className="p-3 lg:p-5 flex items-center" id="interests">
      <div className="w-full">
        <h2 className="mb-5 text-3xl font-bold">Interests</h2>
        <p className="mb-5">
          
        </p>
        <p className="mb-5">
          
        </p>
        <ul className="fa-ul mb-0 list-disc ml-5">
          {interests.map((interest, index) => (
            <li key={index}>
              <i className="fa-li fa fa-check"></i>
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Interests;
