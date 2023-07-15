import React from 'react';

import { useAtomValue } from 'jotai';
import { Controller, useFormContext } from 'react-hook-form';

import { themeAtom } from '~/atoms-global/theme';

import { FieldArea } from './field-area';
import { inputBaseFactory } from './style-base';
import type { InputType } from './types';

const TextAreaStyled = inputBaseFactory('textarea');

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
  const theme = useAtomValue(themeAtom);

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <TextAreaStyled
            id={name}
            {...field}
            ref={ref}
            error={Boolean(errors[name])}
            {...props}
            style={{ colorScheme: theme }}
          />
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
