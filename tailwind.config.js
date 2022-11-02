/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

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
        "weird-purple": "#1e2139",
        lavender: "#dfe3fa",
        "cool-gray": "#888eb0",
      },
    },
    screens: {
      sm: "900px",
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
