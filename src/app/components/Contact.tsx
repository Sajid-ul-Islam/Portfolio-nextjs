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
    <section id="contact" className="py-20 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="border-b-4 border-primary pb-2">Contact</span>
          </h2>
          <p className="text-gray-400">Let’s work together on your next project</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-dark-lighter border border-white/5">
              <div className="flex items-center gap-3 mb-3 text-white">
                <FaEnvelope className="text-accent" />
                <span className="font-semibold">Email</span>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-dark-lighter border border-white/5">
              <div className="flex items-center gap-3 mb-3 text-white">
                <FaWhatsapp className="text-primary" />
                <span className="font-semibold">WhatsApp</span>
              </div>
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-dark-lighter border border-white/5">
              <div className="flex items-center gap-3 mb-3 text-white">
                <FaFilePdf className="text-accent" />
                <span className="font-semibold">Resume</span>
              </div>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                View or download resume
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-dark-lighter border border-white/5">
            <div className="grid grid-cols-1 gap-4">
              <input
                className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary min-h-[140px]"
                placeholder="Project details"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all"
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
