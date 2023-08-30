import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { useTheme } from '~/global-context/theme';

import { Icon } from '../icon';
import { FieldArea } from './field-area';
import { inputBaseFactory, InputIconWrapper } from './style-base';
import type { InputType } from './types';

export type SelectOptionsType = {
  label: string;
  value: string;
};

const SelectStyled = inputBaseFactory('select', 'appearance-none opacity-100');

export function Select({
  name,
  label,
  options,
  disabled,
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
  const { theme } = useTheme();

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <div className="relative">
            <SelectStyled
              id={name}
              {...field}
              ref={ref}
              error={Boolean(errors[name])}
              {...props}
              style={{ colorScheme: theme }}
              disabled={disabled}
            >
              {options.map(({ label: labelOpt, value }) => (
                <option key={value} value={value}>
                  {labelOpt}
                </option>
              ))}
            </SelectStyled>
            <InputIconWrapper disabled={disabled}>
              <Icon icon="expand_more" />
            </InputIconWrapper>
          </div>
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
