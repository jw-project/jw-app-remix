import { Link } from '@remix-run/react';
import { w } from 'windstitch';

export const PublisherContainer = w.div(`
    grid
    md:grid-cols-12
    grid-cols-1
    gap-4  
`);

export const PublisherListContainer = w.div(`
    md:col-span-5
    lg:col-span-4
    xl:col-span-3
`);

export const PublisherDataContainer = w.div(`
    md:col-span-7
    lg:col-span-8
    xl:col-span-9
`);

export const PublisherListStyled = w.ul(`
    divide-y
`);

export const PublisherItemStyled = w(Link, {
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

export const PublisherItemIconContainer = w.div(`
    mr-4
    flex
    items-center
`);

export const PublisherItemTextContainer = w.div(`
    flex-1
    pl-1
`);

export const PublisherItemName = w.div(`
    font-medium
`);

export const PublisherItemSubText = w.div(`
    text-gray-600
    text-sm
`);

export const PublisherItemArrowContainer = w.div(`
    flex
    flex-row
`);
