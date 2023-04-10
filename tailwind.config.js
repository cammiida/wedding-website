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
        yellow: "#FFD98F",
        blue: "#3E85C6",
        "grey-transparent": "#00000040",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
    plugins: [],
  },
  plugins: [],
};
