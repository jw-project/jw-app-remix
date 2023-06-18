import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import tailStyled from 'tailwind-styled-components';

import { Icon } from '../icon';
import { FieldArea } from './field-area';
import { inputsStyleBase } from './style-base';
import type { InputType } from './types';

export type SelectOptionsType = {
  label: string;
  value: string;
};

const SelectStyled = tailStyled.select<{ $error?: boolean }>`
  ${({ $error }) => inputsStyleBase($error)}
  block
  appearance-none
`;

const SelectorStyled = tailStyled.div`
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  px-2
`;

export function Select({
  name,
  label,
  options,
  ...props
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  InputType & { options: SelectOptionsType[] }): JSX.Element {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <div className="relative">
            <SelectStyled
              {...field}
              ref={ref}
              $error={Boolean(errors[name])}
              {...props}
            >
              {options.map(({ label: labelOpt, value }) => (
                <option key={value} value={value}>
                  {labelOpt}
                </option>
              ))}
            </SelectStyled>
            <SelectorStyled>
              <Icon icon="expand_more" />
            </SelectorStyled>
          </div>
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
