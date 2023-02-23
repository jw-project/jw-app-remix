import { Link } from '@remix-run/react';
import tailStyled from 'tailwind-styled-components';

export const PublisherContainer = tailStyled.div`
    grid
    md:grid-cols-12
    gap-4  
`;

export const PublisherListContainer = tailStyled.div`
    md:col-span-5
    lg:col-span-4
    xl:col-span-3
`;

export const PublisherDataContainer = tailStyled.div`
    md:col-span-7
    lg:col-span-8
    xl:col-span-9
`;

export const PublisherListStyled = tailStyled.ul`
    divide-y
`;

export const PublisherItemStyled = tailStyled(Link)<{ selected: boolean }>`
    cursor-pointer
    rounded-lg
    flex
    items-center
    p-4
     ${({ selected }) => (selected ? 'bg-gray-100' : 'hover:bg-gray-50')}
`;

export const PublisherItemIconContainer = tailStyled.div`
    mr-4
    flex
    items-center
`;

export const PublisherItemTextContainer = tailStyled.div`
    flex-1
    pl-1
`;

export const PublisherItemName = tailStyled.div`
    font-medium
`;

export const PublisherItemSubText = tailStyled.div`
    text-gray-600
    text-sm
`;

export const PublisherItemArrowContainer = tailStyled.div`
    flex
    flex-row
`;
