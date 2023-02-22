/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C315E",
        secondary: "#227C70",
        accent: "#88A47C",
        soft: "#E6E2C3",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],

};
