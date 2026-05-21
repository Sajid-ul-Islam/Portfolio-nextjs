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
    const { theme, setTheme } = useNextTheme();

    return {
        theme: (theme || "tactical-dark") as Theme,
        setTheme: (newTheme: Theme) => setTheme(newTheme),
    };
}