import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "vscode-xs": ["11px", { lineHeight: "1.4" }],
        "vscode-sm": ["12px", { lineHeight: "1.4" }],
        "vscode-base": ["13px", { lineHeight: "1.5" }],
        "vscode-lg": ["14px", { lineHeight: "1.5" }],
        "vscode-xl": ["16px", { lineHeight: "1.5" }],
        "vscode-3xl": ["24px", { lineHeight: "1.3" }],
      },
      colors: {
        primary: "#3b82f6", // Blue-500
        secondary: "#1e40af", // Blue-800
        accent: "#f97316", // Orange-500 (Deep Orange)
        dark: {
          DEFAULT: "#0f172a", // Slate-900
          lighter: "#1e293b", // Slate-800
          darker: "#020617", // Slate-950
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(to right bottom, #0f172a, #1e293b)",
      },
    },
  },
  plugins: [],
};
export default config;
