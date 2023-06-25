import React from 'react';

import { useFormContext } from 'react-hook-form';
import { w } from 'windstitch';

import { ErrorLabel } from './error-label';
import { Label } from './style-base';

const FieldAreaWrapper = w.div(`
  w-full
`);

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
