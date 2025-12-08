import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
