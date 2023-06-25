import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useActionData, useSearchParams, useSubmit } from '@remix-run/react';
import { useSetAtom } from 'jotai';
import isEqual from 'lodash/isEqual';
import type {
  DefaultValues,
  FieldPath,
  FieldValues,
  FormState,
} from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

import { addSavingDataAtom } from '~/atoms-global/saving';

type ActionDataReturn<TFieldValues extends FieldValues> = {
  success: boolean;
  errors?: {
    field: FieldPath<TFieldValues> | `root.${string}` | 'root';
    message: string;
  }[];
};

export function Form<
  TOutputField = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TFieldValues extends FieldValues = FieldValues,
>({
  children,
  schema,
  defaultValues,
  api,
  onFormStatusChange,
}: React.PropsWithChildren<{
  schema: ZodType<TOutputField, TDef, TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  api: string;
  onFormStatusChange?: (formState: FormState<TFieldValues>) => void;
}>) {
  // const [searchParams] = useSearchParams('');
  // const personId = searchParams.get('personId');
  // const submit = useSubmit();
  const values = useRef(defaultValues as TFieldValues);
  const actionData = useActionData() as ActionDataReturn<TFieldValues>;
  // const prevSchema = useRef(schema);
  const save = useSetAtom(addSavingDataAtom);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit = (data: TFieldValues): void => {
    // console.log(data);
    save({
      url: api,
      formData: data,
    });
    values.current = data;
  };

  // useEffect(() => {
  //   onFormStatusChange?.(methods.formState);
  // }, [methods.formState, onFormStatusChange]);

  // useEffect(() => {
  //   if (prevSchema.current !== schema) {
  //     methods.formState.isDirty && methods.trigger();
  //   }

  //   prevSchema.current = schema;
  // }, [schema]);

  // useEffect(() => {
  //   if (actionData?.success === false) {
  //     actionData.errors?.forEach((error, i) => {
  //       methods.setError(
  //         error.field,
  //         { message: error.message },
  //         { shouldFocus: i === 0 },
  //       );
  //     });
  //   }
  // }, [actionData, methods]);

  useEffect(() => {
    const subscription = methods.watch(() => methods.handleSubmit(onSubmit)());

    return () => subscription.unsubscribe();
  }, [methods]);

  //onSubmit={methods.handleSubmit(onSubmit)}

  return (
    <FormProvider {...methods}>
      <form id="form-context">{children}</form>
    </FormProvider>
  );
}
