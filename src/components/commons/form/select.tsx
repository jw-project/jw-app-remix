import { useField } from 'remix-validated-form';
import tailStyled from 'tailwind-styled-components';
import { Icon } from '../icon';
import { ErrorLabel, inputsStyleBase, Label } from './style-base';

export type SelectOptionsType = {
  label: string;
  value: string;
};

type SelectType = {
  label: string;
  name: string;
  options: SelectOptionsType[];
} & React.DetailedHTMLProps<
React.SelectHTMLAttributes<HTMLSelectElement>,
HTMLSelectElement
>;

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
  label, name, options, ...props
}: SelectType) {
  const { error, getInputProps } = useField(name);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <SelectStyled
          {...getInputProps({ id: name })}
          $error={Boolean(error)}
          id={name}
          name={name}
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
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
}
