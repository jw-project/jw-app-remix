import { useField } from 'remix-validated-form';
import tailStyled from 'tailwind-styled-components';
import { ErrorLabel, inputsStyleBase, Label } from './style-base';

type InputType = {
  label: string;
  name: string;
  error?: boolean;
} & React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

export const InputStyled = tailStyled.input<{ $error?: boolean }>`
  ${({ $error }) => inputsStyleBase($error)}
`;

export function Input({
  label, name, ...props
}: InputType) {
  const { error, getInputProps } = useField(name);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <InputStyled
        {...getInputProps({ id: name })}
        $error={Boolean(error)}
        {...props}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
}
