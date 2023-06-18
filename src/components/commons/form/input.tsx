import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import tailStyled from 'tailwind-styled-components';

import { FieldArea } from './field-area';
import { inputsStyleBase } from './style-base';
import type { InputType } from './types';

const InputStyled = tailStyled.input<{ $error?: boolean }>`
  ${({ $error }) => inputsStyleBase($error)}
`;

export function Input({
  name,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputType): JSX.Element {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <InputStyled
            {...field}
            ref={ref}
            $error={Boolean(errors[name])}
            {...props}
          />
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
