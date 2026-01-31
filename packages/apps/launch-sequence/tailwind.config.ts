import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00f2ff",
        secondary: "#ffcc00",
        "background-dark": "#060b18",
        "background-dark-alt": "#0a192f",
        "card-dark": "rgba(11, 23, 42, 0.8)",
        "card-dark-alt": "rgba(11, 23, 42, 0.4)",
        "accent-blue": "#1e3a8a",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      boxShadow: {
        "neon-cyan": "0 0 10px rgba(0, 242, 255, 0.3), 0 0 20px rgba(0, 242, 255, 0.1)",
        "neon-gold": "0 0 15px rgba(255, 204, 0, 0.4)",
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
