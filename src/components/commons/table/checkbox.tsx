import { useEffect, useRef, type HTMLProps } from 'react';

import { w } from 'windstitch';

const CheckboxStyled = w.input(`
  w-4
  h-4
  text-blue-600
  bg-gray-100
  border-gray-300
  rounded
  dark:bg-gray-700
  dark:border-gray-600
`);

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  as: _as,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <CheckboxStyled type="checkbox" ref={ref} className={className} {...rest} />
  );
}
