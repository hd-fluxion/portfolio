import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#f7f4fb",
        panel: "#ffffff",
        accent: "#7aa7ff",
        lilac: "#e9e1f6",
        mint: "#e3f6f1",
        text: "#2f3242",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
