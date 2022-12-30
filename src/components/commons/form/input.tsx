import tailStyled from 'tailwind-styled-components';
import { v4 as uuid } from 'uuid';
import { ErrorLabel, inputsStyleBase, Label } from './style-base';

type InputType = {
  label: string
  name: string
  error?: boolean
  disabled?: boolean
  errorLabel?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
};

export const InputStyled = tailStyled.input<{ $error?: boolean }>`
    ${() => inputsStyleBase}
    ${({ $error }) => ($error ? 'border-red-500' : '')}
`;

export function Input({
  label, name, disabled, type, placeholder, errorLabel, error,
}: InputType) {
  const id = uuid();

  return (
    <>
      <Label htmlFor={id}>
        {label}
      </Label>
      <InputStyled
        $error={error}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <ErrorLabel>{errorLabel}</ErrorLabel>}
    </>
  );
}
