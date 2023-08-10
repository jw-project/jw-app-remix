import React from 'react';

import { useAtomValue } from 'jotai';
import { Controller, useFormContext } from 'react-hook-form';

import { themeAtom } from '~/atoms-global/theme';

import type { IconProps } from '../icon';
import { Icon } from '../icon';
import { FieldArea } from './field-area';
import { InputIconWrapper, inputBaseFactory } from './style-base';
import type { InputType } from './types';

const InputStyled = inputBaseFactory(
  'input',
  '[&::-webkit-calendar-picker-indicator]:opacity-0',
);

const inputTypes: Partial<Record<React.HTMLInputTypeAttribute, IconProps>> = {
  time: {
    icon: 'watch_later',
    size: 'icon-x-small',
  },
  date: {
    icon: 'calendar_today',
    size: 'icon-x-small',
  },
};

export function Input({
  name,
  label,
  type,
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
  const theme = useAtomValue(themeAtom);
  const icon = type && inputTypes[type];

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <div className="relative">
            <InputStyled
              id={name}
              {...field}
              ref={ref}
              error={Boolean(errors[name])}
              {...props}
              type={type}
              style={{ colorScheme: theme }}
            />
            {icon && (
              <InputIconWrapper>
                <Icon {...icon} />
              </InputIconWrapper>
            )}
          </div>
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
