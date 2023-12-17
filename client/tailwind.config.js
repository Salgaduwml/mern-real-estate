/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textBlack: "#2b2b2b",
        textGray: "#3d4f58",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        tenor: ["Tenor Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
