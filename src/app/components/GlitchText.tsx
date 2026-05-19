"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../lib/cn";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?~";

type GlitchTextProps = {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
};

export default function GlitchText({ text, className, delay = 0, speed = 30 }: GlitchTextProps) {
    const [displayedText, setDisplayedText] = useState(text);
    const [isMounted, setIsMounted] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        let timeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        timeout = setTimeout(() => {
            setIsGlitching(true);
            let iteration = 0;

            interval = setInterval(() => {
                setDisplayedText((prev) =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " ";
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setIsGlitching(false);
                    setDisplayedText(text); // Lock in final perfect text
                }

                iteration += 1 / 3; // Adjust denominator to control decode duration
            }, speed);
        }, delay);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [text, delay, speed]);

    return (
        <span className={cn(className, !isMounted && "opacity-0", isGlitching && "animate-glitch drop-shadow-[0_0_8px_currentColor]")}>
            {displayedText}
        </span>
    );
}