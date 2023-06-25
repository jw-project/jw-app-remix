import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import styled from 'windstitch';

import { FieldArea } from './field-area';
import { inputBase } from './style-base';
import type { InputType } from './types';

const TextAreaStyled = styled('textarea', inputBase);

export function TextArea({
  name,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
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
          <TextAreaStyled
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
