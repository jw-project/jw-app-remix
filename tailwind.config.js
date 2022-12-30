/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
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
