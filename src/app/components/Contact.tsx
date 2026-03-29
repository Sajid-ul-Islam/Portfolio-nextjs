"use client";
import React, { useState } from "react";
import { personalInfo } from "../data";
import { FaEnvelope, FaWhatsapp, FaFilePdf } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ink">
            Contact
          </h2>
          <p className="text-ink/70">Let’s work together on your next project</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-ink/10">
              <div className="flex items-center gap-3 mb-3 text-ink">
                <FaEnvelope className="text-ink" />
                <span className="font-semibold">Email</span>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-ink/70 hover:text-ink transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-ink/10">
              <div className="flex items-center gap-3 mb-3 text-ink">
                <FaWhatsapp className="text-ink" />
                <span className="font-semibold">WhatsApp</span>
              </div>
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/70 hover:text-ink transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-ink/10">
              <div className="flex items-center gap-3 mb-3 text-ink">
                <FaFilePdf className="text-ink" />
                <span className="font-semibold">Resume</span>
              </div>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/70 hover:text-ink transition-colors"
              >
                View or download resume
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-ink/10">
            <div className="grid grid-cols-1 gap-4">
              <input
                className="w-full px-4 py-3 rounded-lg bg-paper border border-ink/20 text-ink placeholder-ink/40 focus:outline-none focus:border-ink"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-paper border border-ink/20 text-ink placeholder-ink/40 focus:outline-none focus:border-ink"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-paper border border-ink/20 text-ink placeholder-ink/40 focus:outline-none focus:border-ink min-h-[140px]"
                placeholder="Project details"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-ink text-paper font-semibold hover:bg-ink/90 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
