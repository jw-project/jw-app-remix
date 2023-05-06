/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  variants: {
    scrollbar: ["rounded"],
  },
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4)$/,
      variants: ["md"],
    },
    {
      pattern: /col-span-(1|2|3|4)$/,
      variants: ["md"],
    },
  ],
};
