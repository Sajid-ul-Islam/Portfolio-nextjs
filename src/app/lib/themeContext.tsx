"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

export type Theme = "tactical-dark" | "vscode-dark" | "vscode-light" | "dracula" | "monokai";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            defaultTheme="tactical-dark"
            storageKey="vscode-theme"
            themes={["tactical-dark", "vscode-dark", "vscode-light", "dracula", "monokai"]}
        >
            {children}
        </NextThemesProvider>
    );
}

export function useTheme() {
    const { theme, setTheme: setNextTheme } = useNextTheme();

    const setTheme = (newTheme: Theme) => {
        // Smooth crossfade between themes using the View Transitions API (progressive enhancement)
        if (
            typeof document !== "undefined" &&
            // @ts-expect-error - startViewTransition is not yet in all lib.dom versions
            typeof document.startViewTransition === "function" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            // @ts-expect-error - startViewTransition is not yet in all lib.dom versions
            document.startViewTransition(() => setNextTheme(newTheme));
        } else {
            setNextTheme(newTheme);
        }
    };

    return {
        theme: (theme || "tactical-dark") as Theme,
        setTheme,
    };
}