/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      transitionProperty: {
        ring: "#1C315E",
      },

      dropShadow: {
        "primary-xl": "0 25px 25px ,rgba(28,49,94)",
      },

      colors: {
        primary: "#1C315E",
        "primary-semi": "rgba(28,49,94,0.7)",
        secondary: "#227C70",
        accent: "#88A47C",
        soft: "#E6E2C3",
      },
    },
  },
};
