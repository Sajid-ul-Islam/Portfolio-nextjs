"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";
import { soundFx } from "@/app/lib/soundFx";

interface CyberGlitchTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  speed?: number; // ms per frame
  triggerOnMount?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

const CYBER_CHARS = "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_<>{}[]/*";

export default function CyberGlitchText({
  text,
  className,
  scrambleOnHover = true,
  speed = 28,
  triggerOnMount = true,
  as: Component = "span",
}: CyberGlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("");
      });

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (triggerOnMount) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, triggerOnMount, startScramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      soundFx.playClick();
      startScramble();
    }
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={cn(
        "font-mono select-none transition-colors",
        isScrambling && "text-[var(--vscode-accent)] drop-shadow-[0_0_8px_var(--vscode-accent)]",
        className
      )}
    >
      {displayText}
    </Component>
  );
}
