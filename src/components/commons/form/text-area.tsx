import React from 'react';
import { useField } from 'remix-forms';
import tailStyled from 'tailwind-styled-components';
import { inputsStyleBase } from './style-base';

const TextAreaStyled = tailStyled.textarea<{ $error?: boolean }>`
    ${({ $error }) => inputsStyleBase($error)}
`;

function CustomTextArea(
  {
    ...props
  }: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
  >,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
): JSX.Element {
  const { errors } = useField();

  return (
    <TextAreaStyled
      ref={ref}
      $error={Boolean(errors)}
      {...props}
    />
  );
}

export const TextArea = React.forwardRef<
HTMLTextAreaElement,
JSX.IntrinsicElements['textarea']
>(CustomTextArea);
