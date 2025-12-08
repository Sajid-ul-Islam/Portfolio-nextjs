"use client";
import React from 'react';
import { personalInfo } from '../data';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[30%] left-[30%] w-[20%] h-[20%] bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="container mx-auto px-6 z-10 text-center">
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm animate-fade-in">
                    Welcome to my portfolio
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-slide-up">
                    Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{personalInfo.name}</span>
                </h1>

                <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {personalInfo.title}
                </h2>

                <p className="max-w-2xl mx-auto text-gray-400 mb-10 text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    {personalInfo.bio}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Me
                    </a>
                    <a
                        href="#projects"
                        className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    >
                        View Work
                    </a>
                </div>

                <div className="mt-12 flex justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                    <SocialLink href={personalInfo.whatsapp} icon={<FaWhatsapp />} />
                    <SocialLink href={`mailto:${personalInfo.email}`} icon={<FaEnvelope />} />
                    {/* Add more social links if available in data */}
                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-accent text-2xl transition-colors duration-300"
    >
        {icon}
    </a>
);

export default Hero;
