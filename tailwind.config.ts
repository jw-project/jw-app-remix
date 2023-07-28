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
} satisfies Config;
