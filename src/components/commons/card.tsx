import { w } from 'windstitch';

export const Card = w.div(
  `
  bg-white
  shadow
  rounded-lg
`,
  {
    variants: {
      padded: {
        0: '',
        sm: 'p-4 md:p-6',
        md: 'p-6 md:p-8',
      },
    },
    defaultVariants: {
      padded: 'md',
    },
  },
);
