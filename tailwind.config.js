/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#252945",
        red: "#ec5757",
        purple: "#7c5dfa",
        green: "#33d69f",
        orange: "#ff8f00",
        "very-dark-purple": "#141625",
        "dark-gray": "#777f98",
      },
    },
    screens: {
      sm: "900px",
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
