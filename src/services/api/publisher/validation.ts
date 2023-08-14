import { z } from 'zod';

export const publisherBaseFormSchema = z.object({
  name: z.string().min(1, { message: 'common.errors.required-field' }),
  number: z.preprocess(
    (input) => (typeof input === 'number' ? input : 0),
    z.number().gt(0, { message: 'common.errors.required-field' }),
  ),
});
