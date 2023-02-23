import { Link } from '@remix-run/react';
import tailStyled from 'tailwind-styled-components';

import type { IconOpts } from '../icon';
import { Icon } from '../icon';

export type TabProp = {
  title: string;
  icon?: IconOpts;
  to: string;
  selected: boolean;
  disabled?: boolean;
};

export const TabsCard = tailStyled.ul`
    rounded-b-lg
    bg-white
    shadow
    p-4
`;

export const TabsStyled = tailStyled.ul`
    flex
    text-sm
    font-medium
    text-center
    text-gray-500
    overflow-x-auto
    rounded-t-lg
    bg-gray-100
    shadow
    scrollbar
    scrollbar-h-[2px]
    scrollbar-thumb-rounded-full
    scrollbar-thumb-slate-300
    scrollbar-track-white
`;

export const TabStyled = tailStyled.li`
    mr-2
`;

type SelectAndDisableType = {
  selected: boolean;
  $disabled: boolean;
};

export const TabLinkStyled = tailStyled(Link)<SelectAndDisableType>`
    inline-flex
    whitespace-nowrap
    p-4
    rounded-t-lg
    group
    ${({ selected }) => (selected
    ? 'bg-white hover:bg-white text-gray-600'
    : 'hover:text-gray-600 hover:bg-gray-200')}
    ${({ $disabled }) => ($disabled
    ? 'cursor-not-allowed hover:bg-gray-100 hover:text-gray-500'
    : '')}
`;

export const TabIconStyled = tailStyled(Icon)<SelectAndDisableType>`
    mr-2
    ${({ selected }) => (selected ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500')}
    ${({ $disabled }) => ($disabled ? 'hover:text-gray-400 group-hover:text-gray-400' : '')}
`;
