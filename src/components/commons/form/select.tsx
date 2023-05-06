import React from 'react';

import { useField } from 'remix-forms';
import tailStyled from 'tailwind-styled-components';

import { Icon } from '../icon';
import { inputsStyleBase } from './style-base';

export type SelectOptionsType = {
  name: string;
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

function CustomSelect(
  {
    ...props
  }: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  ref: React.ForwardedRef<HTMLSelectElement>,
): JSX.Element {
  const { errors } = useField();

  return (
    <div className="relative">
      <SelectStyled ref={ref} $error={Boolean(errors)} {...props} />
      <SelectorStyled>
        <Icon icon="expand_more" />
      </SelectorStyled>
    </div>
  );
}

export const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements['select']
>(CustomSelect);
