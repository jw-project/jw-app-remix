import type { FormProps, FormSchema } from 'remix-forms';
import { createForm } from 'remix-forms';
import {
  Form as FrameworkForm, useActionData, useSubmit, useTransition as useNavigation,
} from '@remix-run/react';
import { Input } from './input';
import { TextArea } from './text-area';
import { Label } from './style-base';
import { Button } from '../button';
import { Select } from './select';
import { ErrorLabel } from './error-label';

const RemixForm = createForm({
  component: FrameworkForm, useNavigation, useSubmit, useActionData,
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
