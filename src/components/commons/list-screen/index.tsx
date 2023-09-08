import { Link } from '@remix-run/react';
import { w } from 'windstitch';

export const RootListContainer = w.div(`
    grid
    md:grid-cols-12
    grid-cols-1
    gap-4  
`);

export const ListContainer = w.div(
  `
    md:col-span-5
    lg:col-span-4
    xl:col-span-3
`,
  {
    variants: {
      show: (show: boolean) => (show ? 'block' : 'hidden'),
    },
    transient: ['show'],
  },
);

export const DataContainer = w.div(``, {
  variants: {
    full: (full: boolean) =>
      full
        ? 'col-span-full'
        : `
      md:col-span-7
      lg:col-span-8
      xl:col-span-9
  `,
  },
  transient: ['full'],
});

export const ListStyled = w.ul(`
    divide-y
`);

export const ItemStyled = w(Link, {
  className: `
    cursor-pointer
    rounded-lg
    flex
    items-center
    p-4
  `,
  variants: {
    selected: (selected: boolean) =>
      selected ? 'bg-gray-100' : 'hover:bg-gray-50',
  },
  transient: ['selected'],
});

export const ItemIconContainer = w.div(`
    mr-4
    flex
    items-center
`);

export const ItemTextContainer = w.div(`
    flex-1
    pl-1
`);

export const ItemName = w.div(`
    font-medium
`);

export const ItemSubText = w.div(`
    text-gray-600
    text-sm
`);

export const ItemArrowContainer = w.div(`
    flex
    flex-row
`);
