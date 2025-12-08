"use client";
import React from 'react';
import { personalInfo } from '../data';

const Footer = () => {
    return (
        <footer className="bg-darker py-8 border-t border-white/5">
            <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </p>
                <p>Built with Next.js & Tailwind CSS</p>
            </div>
        </footer>
    );
};

export default Footer;
