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
          Besides being a tech enthusiast and a code writer, I enjoy most of my
          time being outdoors. In the winter, I am an avid skier and novice ice
          climber. During the warmer months here in Boston, I enjoy mountain
          biking, free climbing, and kayaking.
        </p>
        <p className="mb-5">
          When forced indoors, I follow a number of sci-fi and fantasy genre
          movies and television shows, I am an aspiring chef, and I spend a
          large amount of my free time exploring the latest technology
          advancements in the front-end web development world.
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
