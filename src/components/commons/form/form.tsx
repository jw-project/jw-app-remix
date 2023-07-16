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
  onFormApiSuccess,
  onFormApiErrors,
}: React.PropsWithChildren<{
  schema: ZodType<TOutputField, TDef, TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  api: string;
  onFormStatusChange?: (formState: FormState<TFieldValues>) => void;
  onFormApiSuccess?: (success: any) => void;
  onFormApiErrors?: (errors: ErrorsApiListType) => void;
}>) {
  const idInstance = useMemo(() => uuid(), []);
  const save = useSetAtom(addSavingDataAtom);
  const [apiErrors, removeApiError] = useAtom(errorsApiListAtom);
  const [apiSuccess, removeApiSuccess] = useAtom(removeSuccessApiAtom);

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
      methods.handleSubmit(onSubmit)();
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form id="form-context">{children}</form>
    </FormProvider>
  );
}
