import { useField } from 'remix-validated-form';
import tailStyled from 'tailwind-styled-components';
import { ErrorLabel, inputsStyleBase, Label } from './style-base';

type TextAreaType = {
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
};

export const InputStyled = tailStyled.textarea<{ $error?: boolean }>`
    ${({ $error }) => inputsStyleBase($error)}
`;

export function TextArea({
  label, name, disabled, placeholder,
}: TextAreaType) {
  const { error, getInputProps } = useField(name);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <InputStyled
        {...getInputProps({ id: name })}
        $error={Boolean(error)}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
}
