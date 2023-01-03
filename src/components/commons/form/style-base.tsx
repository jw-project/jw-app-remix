import tailStyled from 'tailwind-styled-components';

export const Label = tailStyled.label`
  block
  uppercase
  tracking-wide
  text-gray-600
  text-xs
  font-bold
  mb-2
`;

export const ErrorLabel = tailStyled.p`
  text-red-500
  text-xs
  italic
`;

export const inputsStyleBase = (error?: boolean) => `
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
  ${error ? 'border-red-500' : ''}
`;
