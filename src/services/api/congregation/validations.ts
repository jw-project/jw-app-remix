import { z } from 'zod';

import { Week } from '~/entities/week';

export const congregationFormSchema = z.object({
  name: z.string().min(1, { message: 'common.required-field' }),
  number: z.preprocess(
    (input) => (typeof input === 'number' ? input : 0),
    z.number().gt(0, { message: 'common.required-field' }),
  ),
  address: z.string().min(1, { message: 'common.required-field' }),
  midweekMeetingDay: z
    .nativeEnum(Week, {
      errorMap: () => ({ message: 'common.invalid-field' }),
    })
    .default(Week.THURSDAY),
  weekendMeetingDay: z
    .nativeEnum(Week, {
      errorMap: () => ({ message: 'common.invalid-field' }),
    })
    .default(Week.SUNDAY),
});
