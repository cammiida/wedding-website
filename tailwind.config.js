/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD98F",
        blue: "#3E85C6",
        "dark-grey": "#00000040",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      redhat: ["Red Hat Text", "sans-serif"],
    },
    plugins: [],
  },
  plugins: [],
};
