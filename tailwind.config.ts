import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F4",
        ink: "#1A1815",
        accent: "#C05621",
        muted: "#6E675F",
        line: "rgba(26, 24, 21, 0.12)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "45rem",
        wide: "68rem",
      },
    },
  },
  plugins: [],
};
export default config;
