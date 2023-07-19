import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useSetAtom } from 'jotai';
import type {
  DefaultValues,
  FieldValues,
  FormState,
  Path,
} from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import type { ZodType, ZodTypeDef } from 'zod';

import type { ErrorsApiListType } from '~/atoms-global/saving';
import {
  addSavingDataAtom,
  errorsApiListAtom,
  removeSuccessApiAtom,
} from '~/atoms-global/saving';

import type { FormBuilderProps } from './form-builder';
import { FormBuilder } from './form-builder';

export function Form<
  TOutputField = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TFieldValues extends FieldValues = FieldValues,
>({
  children,
  schema,
  defaultValues,
  api,
  mode = 'onChange',
  fields,
  onFormStatusChange,
  onFormApiSuccess,
  onFormApiErrors,
}: React.PropsWithChildren<{
  schema: ZodType<TOutputField, TDef, TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  api: string;
  mode?: 'onChange' | 'onSubmit';
  fields?: FormBuilderProps['fields'];
  onFormStatusChange?: (formState: FormState<TFieldValues>) => void;
  onFormApiSuccess?: (success: any) => void;
  onFormApiErrors?: (errors: ErrorsApiListType) => void;
}>) {
  const idInstance = useMemo(() => uuid(), []);
  const save = useSetAtom(addSavingDataAtom);
  const [apiErrors, removeApiError] = useAtom(errorsApiListAtom);
  const [apiSuccess, removeApiSuccess] = useAtom(removeSuccessApiAtom);

  const methods = useForm({
    mode,
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit = (data: TFieldValues): void => {
    save({
      url: api,
      formData: data,
      id: idInstance,
    });
  };

  useEffect(() => {
    const success = apiSuccess.find(
      (success) => success.formIntanceId === idInstance,
    );
    if (success) {
      onFormApiSuccess?.(success);
    }
    removeApiSuccess(idInstance);
  }, [apiSuccess.length]);

  useEffect(() => {
    const error = apiErrors.find((error) => error.formIntanceId === idInstance);
    if (error) {
      onFormApiErrors?.(error);
      methods.setError(
        error.field as Path<TFieldValues>,
        {
          type: 'api',
          message: error.message,
        },
        { shouldFocus: true },
      );
    }
  }, [apiErrors.length]);

  useEffect(() => {
    onFormStatusChange?.(methods.formState);
  }, [methods.formState]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      removeApiError(idInstance);
      if (mode === 'onChange') {
        methods.handleSubmit(onSubmit)();
      }
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'onSubmit') {
      methods.handleSubmit(onSubmit)();
    }
  };

  return (
    <FormProvider {...methods}>
      <form id="form-context" onSubmit={submitForm}>
        {fields && <FormBuilder fields={fields} />}
        {children}
      </form>
    </FormProvider>
  );
}
