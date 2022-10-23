/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "900px",
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
