import type { TypedResponse } from '@remix-run/server-runtime';

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
