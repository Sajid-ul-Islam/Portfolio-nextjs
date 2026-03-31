"use client";
import { useState, useEffect } from "react";

type TypewriterProps = {
  text: string;
  speed?: "slow" | "medium" | "fast";
  delay?: number;
};

const speeds = {
  slow: 80,
  medium: 40,
  fast: 20,
};

export default function Typewriter({ text, speed = "medium", delay = 0 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
      }
    }, speeds[speed]);

    return () => clearInterval(intervalId);
  }, [text, speed, started]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-4 bg-[#a3e635] ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
}
