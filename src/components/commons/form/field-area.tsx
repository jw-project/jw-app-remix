import React from 'react';

import { useFormContext } from 'react-hook-form';
import tailStyled from 'tailwind-styled-components';

import { ErrorLabel } from './error-label';
import { Label } from './style-base';

export const FieldAreaWrapper = tailStyled.div`
  w-full
`;

export const FieldArea = ({
  children,
  label,
  error,
  name,
}: React.PropsWithChildren<{
  name: string;
  label: string;
  error?: string;
}>) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FieldAreaWrapper>
      <Label>{label}</Label>
      {children}
      <ErrorLabel>{error || errors[name]?.message?.toString()}</ErrorLabel>
    </FieldAreaWrapper>
  );
};
