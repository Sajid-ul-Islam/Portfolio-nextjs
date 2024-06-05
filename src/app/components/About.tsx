// components/About.js
import React from "react";

const About = () => {
  return (
    <section className="p-3 lg:p-5 flex items-center" id="about">
      <div className="w-full">
        <h1 className="mb-0 text-4xl font-bold">
          Sajid <span className="text-primary">Islam</span>
        </h1>
        <div className="mb-5 text-primary">
          <p>
            <i className="far fa-envelope"></i>
            <a href="mailto:sajid.islam.chowdhury@gmail.com">
              sajid.islam.chowdhury@gmail.com
            </a>
          </p>
          <p>
            <i className="fab fa-whatsapp"></i>
            <a href="tel:+880609784088">+8801609784088</a>
          </p>
        </div>
        <p className="mb-5">
          Experienced in leveraging data-driven insights to optimize business
          processes and drive strategic decision-making. Eager to contribute
          analytical expertise and technical proficiency to a dynamic
          organization.
        </p>
        <div className="social-icons flex space-x-4">
          <a
            href="https://www.linkedin.com/in/sajidislamchowdhury/"
            target="_blank"
            className="text-blue-600"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com/saajiidi"
            target="_blank"
            className="text-gray-800"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.kaggle.com/saajiidi"
            target="_blank"
            className="text-blue-500"
          >
            <i className="fab fa-kaggle"></i>
          </a>
          <a
            href="https://www.facebook.com/Islam.Sajid.Chowdhury/"
            target="_blank"
            className="text-blue-700"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
