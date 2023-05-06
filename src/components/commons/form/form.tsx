import {
  Form as FrameworkForm,
  useActionData,
  useTransition as useNavigation,
  useSubmit,
} from '@remix-run/react';
import type { FormProps, FormSchema } from 'remix-forms';
import { createForm } from 'remix-forms';

import { Button } from '../button';
import { ErrorLabel } from './error-label';
import { FakeInput } from './fake-input';
import { Input } from './input';
import { Select } from './select';
import { Label } from './style-base';
import { TextArea } from './text-area';

const RemixForm = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

export function Form<Schema extends FormSchema>(props: FormProps<Schema>) {
  return (
    <RemixForm<Schema>
      //   className={/* your form classes */}
      //   fieldComponent={/* your custom Field */}
      labelComponent={Label}
      inputComponent={Input}
      multilineComponent={TextArea}
      selectComponent={Select}
      //   checkboxComponent={/* your custom Checkbox */}
      //   checkboxWrapperComponent={/* your custom checkbox wrapper */}
      buttonComponent={Button}
      //   fieldErrorsComponent={/* your custom FieldErrors */}
      //   globalErrorsComponent={/* your custom GlobalErrors */}
      errorComponent={ErrorLabel}
      {...props}
    />
  );
}
