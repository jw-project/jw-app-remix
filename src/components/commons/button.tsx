import tailStyled from 'tailwind-styled-components';

const buttonStyles = {
  primary: `
    bg-blue-500
    border-blue-500
    text-white
    enabled:hover:border-gray-500
    enabled:hover:bg-blue-600
    enabled:active:bg-blue-700
    `,
  secondary: `
    bg-gray-100
    border-gray-100
    text-gray-700
    enabled:hover:border-gray-300
    enabled:hover:bg-gray-200
    enabled:active:bg-gray-300
    `,
};

type ButtonType = {
  $type?: keyof typeof buttonStyles;
  $bold?: boolean;
};

export const Button = tailStyled.button<ButtonType>`
    leading-normal
    flex
    border
    cursor-pointer
    justify-center
    px-4
    py-2
    text-center
    whitespace-nowrap
    rounded
    focus:outline-none
    ${({ $type }) => buttonStyles[$type || 'primary']}
    ${({ $bold }) => ($bold ? 'font-bold' : '')}
    disabled:opacity-50
    disabled:cursor-not-allowed
`;
