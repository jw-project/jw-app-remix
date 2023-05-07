import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
  variants: {
    scrollbar: ['rounded'],
  },
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4)$/,
      variants: ['md'],
    },
    {
      pattern: /col-span-(1|2|3|4)$/,
      variants: ['md'],
    },
  ],
} satisfies Config;
