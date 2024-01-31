import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        primary: "#09090A",
        secondary: "#1F1F22",
        text: "#EFEFEF",
        accent: "#7615BA",
        teal: "#008080",
        purple: "#400080",
        backgroundblack: "#021D1D",
        sky: "var(--primary-100, #0FF);",
        grey: "#7E92A2",
        purpleTag: "#D1B9FF",
        purpleSmallDeep: "#A87BFF",
        offWhite: "#F1F1F1",
        deepGreen: "#098787",
        redBtn: "#FA0909",
      },
    },
  },
  plugins: [],
};
export default config;
