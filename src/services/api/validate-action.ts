import type { TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { ZodRawShape, z } from 'zod';

import { InputError } from './errors';

export async function validateAction<T extends ZodRawShape>({
  request,
  schema,
  callback,
}: {
  request: Request;
  schema: z.ZodObject<T>;
  callback: (
    values: z.infer<z.ZodObject<T>>,
  ) => Promise<
    | TypedResponse<never>
    | TypedResponse<z.infer<typeof schema>>
    | undefined
    | ReturnType<AppRouteController<ServerSpread>['next']>
  >;
}) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const validatedSchema = schema.safeParse(data);

  if (validatedSchema.success) {
    try {
      return await callback(validatedSchema.data);
    } catch (error) {
      if (error instanceof InputError) {
        return json(
          {
            success: false,
            errors: [{ field: error.field, message: error.message }],
          },
          400,
        );
      }

      return json(
        {
          success: false,
          globalError: (error as Error).message,
        },
        400,
      );
    }
  } else {
    return json(
      {
        success: false,
        errors: validatedSchema.error.errors.map(({ path, message }) => ({
          field: path[0],
          message,
        })),
      },
      400,
    );
  }
}
