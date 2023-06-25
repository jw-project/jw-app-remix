import type { ElementType } from 'react';

import { w } from 'windstitch';
import type { ComponentConfig } from 'windstitch/dist/types';

export const Label = w.label(`
  block
  uppercase
  tracking-wide
  text-gray-600
  text-xs
  font-bold
  mb-2
`);

export const inputBase: ComponentConfig<
  { error: (value: boolean) => string },
  {
    error: boolean;
  },
  ElementType
> = {
  className: `
    disabled:bg-gray-200
    disabled:cursor-not-allowed
    w-full
    bg-gray-50
    text-gray-700
    border
    rounded
    py-3
    px-4
    mb-3
  `,
  variants: {
    error: (error?: boolean) => (error ? 'border-red-500' : ''),
  },
  defaultVariants: {
    error: false,
  },
  transient: ['error'],
};
