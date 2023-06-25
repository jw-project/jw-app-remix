import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import styled from 'windstitch';

import { FieldArea } from './field-area';
import { inputBase } from './style-base';
import type { InputType } from './types';

const InputStyled = styled('input', inputBase);

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
            error={Boolean(errors[name])}
            {...props}
          />
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
