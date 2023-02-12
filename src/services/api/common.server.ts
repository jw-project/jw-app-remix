import { json } from '@remix-run/node';
import type { DomainFunction } from 'domain-functions';
import type {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase-admin/firestore';
import { performMutation } from 'remix-forms';
import type { z, ZodRawShape } from 'zod';

import { ToastType } from '~/components/commons/toast';

export const getAllData = <T>(snap: QuerySnapshot<DocumentData>) => snap
  .docs
  .map((e) => e.data()) as T;

export const getData = <T>(snap: DocumentSnapshot<DocumentData>) => snap
  .data() as T;

export async function checkReturnMessage<T extends ZodRawShape, F>({
  request,
  schema,
  mutation,
}: {
  request: Request;
  schema: z.ZodObject<T>;
  mutation: DomainFunction<F>;
}) {
  const result = await performMutation({ request, schema, mutation });

  if (!result.success) {
    console.error('This erro:', result.errors, 'on try sent:', result.values);
    return json(
      {
        ...result,
        // eslint-disable-next-line no-underscore-dangle
        message: result.errors._global?.join(', ') || 'Any error',
        messageType: ToastType.ERROR,
      },
      400,
    );
  }

  return json({ message: 'salvou!' });
}
