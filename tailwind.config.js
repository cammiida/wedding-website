const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["sans-serif"],
      roboto: ['"Roboto Serif"', "serif"],
    },
    extend: {
      colors: {
        yellow: "#FAF1E4", // "#FFD98F",
        blue: "#3E85C6",
        "grey-transparent": "#00000040",
        "light-grey": "#d1cabd",
        "med-grey": "#686866",
        grey: "#292929",
        brown: "#C87444",
        beige: "#FAF1E4",
        "light-green": "#CEDEBD",
        "med-green": "#9EB384",
        "dark-green": "#435334",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 4px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
    plugins: [],
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
