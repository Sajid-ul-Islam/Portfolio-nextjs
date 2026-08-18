"use client";

import { useEffect } from "react";
import { personalInfo } from "@/app/data/portfolio";

/**
 * Updates document.title to reflect live "online" status, mirroring the
 * "Workspace Active" badge. Pure chrome — no visual DOM.
 */
export default function TitleStatus() {
  useEffect(() => {
    const base = `${personalInfo.name} | ${personalInfo.title}`;
    const dot = "●";
    let on = true;
    let timer: ReturnType<typeof setInterval>;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      document.title = `${dot} ${base}`;
    } else {
      document.title = `${dot} ${base}`;
      timer = setInterval(() => {
        on = !on;
        document.title = on ? `${dot} ${base}` : `○ ${base}`;
      }, 2000);
    }

    return () => clearInterval(timer);
  }, []);

  return null;
}
