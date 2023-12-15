import { w, type W } from 'windstitch';

export const DrawerWrapper = w.div(
  `
    fixed
    top-0
    right-0
    z-50
    h-screen
    p-4
    pt-12
    overflow-y-auto
    transition-transform
    bg-white
    dark:bg-gray-800
`,
  {
    variants: {
      open: (open: boolean) => (open ? '' : 'translate-x-full'),
      size: {
        small: 'w-1/4',
        medium: 'w-1/3',
        large: 'w-1/2',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export type DrawerWrapperStyledType = W.Infer<typeof DrawerWrapper>;

export const DrawerCloseButton = w.button(`
    text-gray-400
    bg-transparent
    hover:bg-gray-200
    hover:text-gray-900
    rounded-lg
    text-sm
    w-8
    h-8
    absolute
    top-2.5
    right-2.5
    inline-flex
    items-center
    justify-center
    dark:hover:bg-gray-600
    dark:hover:text-white
`);
