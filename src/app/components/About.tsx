"use client";
import Typewriter from "./Typewriter";
import { personalInfo, metrics } from "../data";

const About = () => {
  return (
    <section id="about" className="py-20 bg-paper">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ink">
            About
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6 font-mono">
            <Typewriter text={personalInfo.bio} speed="medium" delay={500} />
          </p>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-paper transition-all"
          >
            View Portfolio
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-ink/10"
            >
              <div className="text-3xl font-bold text-ink mb-2">
                {item.value}
              </div>
              <div className="text-sm uppercase tracking-wider text-ink/70 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-ink/60">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
