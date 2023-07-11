import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import type { DefaultValues, FieldValues, FormState } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

import { addSavingDataAtom } from '~/atoms-global/saving';

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
  const values = useRef(defaultValues as TFieldValues);
  const save = useSetAtom(addSavingDataAtom);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit = (data: TFieldValues): void => {
    save({
      url: api,
      formData: data,
    });
    values.current = data;
  };

  useEffect(() => {
    onFormStatusChange?.(methods.formState);
  }, [methods.formState, onFormStatusChange]);

  useEffect(() => {
    const subscription = methods.watch(() => methods.handleSubmit(onSubmit)());

    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form id="form-context">{children}</form>
    </FormProvider>
  );
}
