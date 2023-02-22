import { z } from 'zod';

import { Week } from '~/entities/week';

export const congregationFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'common.required-field' }),
  number: z
    .preprocess(
      (input) => (typeof input === 'number' ? input : 0),
      z.number().gt(0, { message: 'common.required-field' }),
    ),
  address: z
    .string()
    .min(1, { message: 'common.required-field' }),
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
  midweekMeetingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'common.required-field',
    }),
  weekendMeetingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'common.required-field',
    }),
  onlineMeetingSoftware: z
    .string(),
  onlineMeetingId: z
    .string(),
  onlineMeetingDialNumber: z
    .string(),
  onlineMeetingPassword: z
    .string(),
  onlineMeetingLink: z
    .string(),
  circuitName: z
    .string(),
  circuitOverseerName: z
    .string(),
  circuitOverseerContact: z
    .string(),
});
