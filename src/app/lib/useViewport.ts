"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS = {
  md: 768,
  lg: 1024,
};

export function useViewport() {
  const [width, setWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = isMounted && width < BREAKPOINTS.md;
  const isTablet = isMounted && width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isDesktop = isMounted && width >= BREAKPOINTS.lg;

  return { width, isMounted, isMobile, isTablet, isDesktop };
}
