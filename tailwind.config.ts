import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          // Fontivo v2.0 Identity: Plum Ink + Coral + Lavender + Amber + Warm Paper
          navy: "#130C16",
          darker: "#0D0810",
          plum: {
            DEFAULT: "#291C2E",
            deep: "#130C16",
            surface: "#1B1220",
            card: "#231829",
          },
          coral: {
            DEFAULT: "#F16B50",
            hover: "#D9583E",
            light: "#F68C76",
            glow: "rgba(241, 107, 80, 0.25)",
          },
          lavender: {
            DEFAULT: "#B7A1D9",
            hover: "#A288CC",
            light: "#D0C0E8",
            glow: "rgba(183, 161, 217, 0.25)",
          },
          amber: {
            DEFAULT: "#F7B544",
            hover: "#E5A230",
            light: "#F9C973",
            glow: "rgba(247, 181, 68, 0.25)",
          },
          lime: {
            DEFAULT: "#C7D65A",
            hover: "#B4C446",
            light: "#D7E382",
          },
          paper: {
            DEFAULT: "#F5EBDD",
            white: "#FFF9F2",
            gray: "#E8E1D6",
          },
          slate: {
            DEFAULT: "#5A5366",
          },
          surface: {
            DEFAULT: "#1B1220",
            100: "#291C2E",
            200: "#231829",
            300: "#1B1220",
          },
          border: {
            subtle: "#2E2036",
            DEFAULT: "#43314D",
            highlight: "#5A5366",
          },
          text: {
            primary: "#FFF9F2",
            secondary: "#D8CEDF",
            muted: "#9A8FA6",
          },
          // Semantic aliases mapped to v2.0 palette for seamless component inheritance
          purple: {
            DEFAULT: "#F16B50",
            hover: "#D9583E",
            light: "#F68C76",
            glow: "rgba(241, 107, 80, 0.25)",
          },
          cyan: {
            DEFAULT: "#B7A1D9",
            hover: "#A288CC",
            light: "#D0C0E8",
            glow: "rgba(183, 161, 217, 0.25)",
          },
          pink: {
            DEFAULT: "#F7B544",
            hover: "#E5A230",
            light: "#F9C973",
            glow: "rgba(247, 181, 68, 0.25)",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "var(--font-inter)", "Sora", "Inter", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-tajawal)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        arabic: ["var(--font-tajawal)", "Tajawal", "Noto Sans Arabic", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        "swiss": "0 1px 3px 0 rgba(0, 0, 0, 0.35), 0 1px 2px -1px rgba(0, 0, 0, 0.35)",
        "card": "0 4px 20px -2px rgba(19, 12, 22, 0.8), 0 2px 6px -1px rgba(0, 0, 0, 0.45)",
        "purple-glow": "0 0 25px -5px rgba(241, 107, 80, 0.4)",
        "cyan-glow": "0 0 25px -5px rgba(183, 161, 217, 0.4)",
        "coral-glow": "0 0 25px -5px rgba(241, 107, 80, 0.4)",
        "lavender-glow": "0 0 25px -5px rgba(183, 161, 217, 0.4)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #2E2036 1px, transparent 1px), linear-gradient(to bottom, #2E2036 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
