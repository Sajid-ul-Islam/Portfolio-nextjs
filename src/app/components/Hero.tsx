"use client";
import React from "react";
import Image from "next/image";
import { personalInfo } from "../data";

const Hero = () => {
  return (
    <section id="hero" className="pt-28 pb-16 bg-paper">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
          <div className="text-center lg:text-right">
            <div className="text-3xl md:text-5xl font-bold text-ink">
              Designer
            </div>
            <div className="text-sm text-ink/70 mt-3">
              Product and visual design, UI systems, and clean layouts.
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border border-ink/20 shadow-lg">
              <Image
                src="/img/profile.jpg"
                alt={personalInfo.name}
                width={520}
                height={520}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-ink">
              {personalInfo.name}
            </h1>
            <p className="text-ink/70 mt-2">{personalInfo.title}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#portfolio"
                className="px-6 py-3 rounded-full bg-ink text-paper hover:bg-ink/90 transition-all"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-paper transition-all"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <div className="text-3xl md:text-5xl font-bold text-ink">
              &lt;Coder&gt;
            </div>
            <div className="text-sm text-ink/70 mt-3">
              Front-end development, data apps, and performance-focused UI.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
