import React from "react";
import { FaTrophy } from "react-icons/fa";

const awards = [
  {
    title:
      "Data Mining Techniques to Categorize Single Paragraph-Formed Self-Narrated Stories",
    link: "https://ict4sd.org/link/proceedings/ICT4SD-2020-VOL2.pdf",
    description:
      "Detecting sentiment in stories has become popular, often using deep learning. When data is limited, machine learning is used. Sentiment analysis is hard due to slang, ambiguity, and sarcasm, which can confuse people and machines. This study is part of ongoing research on categorizing paragraphs by sentiment. The dataset includes narrated stories from various sources.",
    date: "Dec 14, 2020",
  },
  {
    title: "Certification Link 1",
    link: "https://drive.google.com/file/d/1cJxcJJur1n3MiXFETv5k30SDP0WP9wOm/view?usp=sharing",
  },
  {
    title: "Certification Link 2",
    link: "https://drive.google.com/file/d/1O7O6jJRN58WGiyJu8hYrGhv-DtP89bEI/view?usp=sharing",
  },
];

const Awards = () => {
  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="awards"
    >
      <div className="w-full max-w-4xl">
        <h2 className="mb-5 text-4xl font-bold text-left">
          Awards & Certifications
        </h2>
        {awards.map((award, index) => (
          <div
            key={index}
            className="mb-5 p-5 rounded-lg shadow-lg bg-black"
          >
            <div className="flex items-center mb-3">
              <FaTrophy className="text-warning mr-3" />
              <h3 className="text-xl font-semibold text-primary">
                <a href={award.link} target="_blank" rel="noopener noreferrer">
                  {award.title}
                </a>
              </h3>
            </div>
            {award.description && (
              <div className="text-lg">
                <h4 className="font-semibold">Summary:</h4>
                <p>{award.description}</p>
              </div>
            )}
            {award.date && (
              <div className="text-md-right text-primary">
                <span>{award.date}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
