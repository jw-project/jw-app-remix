import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import type {
  DefaultValues,
  FieldValues,
  FormState,
  Path,
} from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import type { ZodType, ZodTypeDef } from 'zod';

import type { ErrorsApiListType } from '~/hooks/saving';
import { useSave } from '~/hooks/saving';

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
  builder,
  onFormStatusChange,
  onFormApiSuccess,
  onFormApiErrors,
}: React.PropsWithChildren<{
  schema: ZodType<TOutputField, TDef, TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  api: string;
  mode?: 'onChange' | 'onSubmit';
  builder?: FormBuilderProps;
  onFormStatusChange?: (formState: FormState<TFieldValues>) => void;
  onFormApiSuccess?: (success: any) => void;
  onFormApiErrors?: (errors: ErrorsApiListType) => void;
}>) {
  const idInstance = useMemo(() => uuid(), []);
  const {
    addSavingData,
    errorsList,
    removeErrorsApi,
    successApiList,
    removeSuccessApi,
  } = useSave();

  const methods = useForm({
    mode,
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit = (data: TFieldValues): void => {
    addSavingData({
      url: api,
      formData: data,
      id: idInstance,
    });
  };

  useEffect(() => {
    const success = successApiList.find(
      (success) => success.formIntanceId === idInstance,
    );
    if (success) {
      onFormApiSuccess?.(success);
    }
    removeSuccessApi(idInstance);
  }, [successApiList.length]);

  useEffect(() => {
    const error = errorsList.find(
      (error) => error.formIntanceId === idInstance,
    );
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
  }, [errorsList.length]);

  useEffect(() => {
    onFormStatusChange?.(methods.formState);
  }, [methods.formState]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      removeErrorsApi(idInstance);
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
        {builder && <FormBuilder {...builder} />}
        {children}
      </form>
    </FormProvider>
  );
}
