// components/Awards.js
import React from "react";

const Awards = () => {
  const awards = [
    "Google Analytics Certified Developer",
    "Mobile Web Specialist - Google Certification",
    "1st Place - University of Dhaka Thesis Paper Presentation",
    ,
  ];

  return (
    <section
      className="resume-section p-3 p-lg-5 d-flex align-items-center section-spacing"
      id="awards"
    >
      <div className="container">
        <h2 className="mb-5 section-spacing">Awards & Certifications</h2>
        <ul className="fa-ul mb-3">
          <li className="mb-3">
            <i className="fa-li fa fa-trophy text-warning"></i>
            <p>
              <a href="https://ict4sd.org/link/proceedings/ICT4SD-2020-VOL2.pdf">
                Data Mining Techniques to Categorize Single Paragraph-Formed
                Self-Narrated Stories at ICT Analysis and Applications
                Proceedings of ICT4SD 2020, Volume 2 Page 701-714 - Dec 14, 2020
              </a>
            </p>

            <p>
              <h4>Summary:</h4>Detecting sentiment in stories has become
              popular, often using deep learning. When data is limited, machine
              learning is used. Sentiment analysis is hard due to slang,
              ambiguity, and sarcasm, which can confuse people and machines.
              This study is part of ongoing research on categorizing paragraphs
              by sentiment. The dataset includes narrated stories from various
              sources.
            </p>
          </li>
          <li>
            <i className="fa-li fa fa-trophy text-warning"></i>
            <a href="https://drive.google.com/file/d/1cJxcJJur1n3MiXFETv5k30SDP0WP9wOm/view?usp=sharing">
              Certification Link1
            </a>
          </li>
          <li>
            <i className="fa-li fa fa-trophy text-warning"></i>
            <a href="https://drive.google.com/file/d/1O7O6jJRN58WGiyJu8hYrGhv-DtP89bEI/view?usp=sharing">
              Certification Link2
            </a>
          </li>
        </ul>
      </div>
    </section>

  );
};

export default Awards;
