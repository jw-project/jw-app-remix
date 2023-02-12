import React from 'react';

import { useField } from 'remix-forms';
import tailStyled from 'tailwind-styled-components';

import { inputsStyleBase } from './style-base';

const InputStyled = tailStyled.input<{ $error?: boolean }>`
  ${({ $error }) => inputsStyleBase($error)}
`;

function CustomInput(
  {
    ...props
  }: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  >,
  ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element {
  const { errors } = useField();

  return (
    <InputStyled
      ref={ref}
      $error={Boolean(errors)}
      {...props}
    />
  );
}

export const Input = React.forwardRef<
HTMLInputElement,
JSX.IntrinsicElements['input']
>(CustomInput);
