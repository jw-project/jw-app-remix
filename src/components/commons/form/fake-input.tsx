import React from 'react';

import tailStyled from 'tailwind-styled-components';

import { inputsStyleBase, Label } from './style-base';

const FakeInputStyle = tailStyled.input`
  ${() => inputsStyleBase()}
`;

export function FakeInput({
  value,
  disabled,
  label,
}: {
  disabled?: boolean;
  value?: string;
  label?: string;
}) {
  return (
    <>
      <Label>{label}</Label>
      <FakeInputStyle disabled={disabled} value={value} />
    </>
  );
}
