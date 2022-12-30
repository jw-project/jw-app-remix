import tailStyled from 'tailwind-styled-components';

export const Button = tailStyled.button`
    inline-flex
    border
    cursor-pointer
    justify-center
    px-4
    py-2
    text-center
    whitespace-nowrap rounded
    hover:border-gray-500
    focus:outline-none
    bg-blue-500
    border-blue-500
    text-white
    hover:bg-blue-600
    active:bg-blue-700
`;
