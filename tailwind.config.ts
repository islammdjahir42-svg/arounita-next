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
        primary: {
          DEFAULT: "#FF6600",
          50: "#FFF3EB",
          100: "#FFE4CC",
          500: "#FF6600",
          600: "#E65C00",
          700: "#CC5200",
        },
        topbar: "#FFF0F0",
        hot: "#EF4444",
      },
      fontFamily: {
        bengali: ["'Hind Siliguri'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
