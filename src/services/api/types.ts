import type {
  TypedDeferredData,
  TypedResponse,
} from '@remix-run/server-runtime';

import type { InputError } from './throws-errors';

export type ActionResponse<T> = Promise<
  | TypedResponse<
      | InputError
      | {
          message: string;
          feedback: boolean;
        }
    >
  | T
>;

export type LoaderDeferredResponse<T extends Record<string, unknown>> = Promise<
  TypedDeferredData<T>
>;
