/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          main: "#d40002",
        },
        dark_gray: "#a09f9c",
        light_gray: "#f0eeea",
        brick: "#cf5047",
        pink: "#df847d",
        light_pink: "#eebaad",
        green: "#8da87a",
        red: "#de3a2e",
        light_text: "#f8dfd4",
        brown: "#543310",
      },
    },
  },
  plugins: [],
};
