import { json } from '@remix-run/server-runtime';

export type InputError = {
  field: string;
  message: string;
};

export function throwInputError(inputError: InputError) {
  return json(inputError, 400);
}
