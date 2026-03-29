"use client";
import React from 'react';
import { personalInfo } from '../data';

const Footer = () => {
    return (
        <footer className="bg-paper py-10 border-t border-ink/10">
            <div className="container mx-auto px-6 text-center text-ink/60 text-sm">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </p>
                <p>Built with Next.js & Tailwind CSS</p>
            </div>
        </footer>
    );
};

export default Footer;
