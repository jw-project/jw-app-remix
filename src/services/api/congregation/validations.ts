import { z } from 'zod';

import { Week } from '~/entities/week';
import {
  INVALID_FIELD_I18N_KEY,
  REQUIRED_FIELD_I18N_KEY,
} from '~/services/consts';

export const congregationFormSchema = z.object({
  name: z.string({ required_error: REQUIRED_FIELD_I18N_KEY }),
  number: z.preprocess(
    Number,
    z.number().gt(0, { message: REQUIRED_FIELD_I18N_KEY }),
  ),
  address: z.string().min(1, { message: REQUIRED_FIELD_I18N_KEY }).optional(),
  midweekMeetingDay: z
    .nativeEnum(Week, {
      errorMap: () => ({ message: INVALID_FIELD_I18N_KEY }),
    })
    .default(Week.THURSDAY)
    .optional(),
  weekendMeetingDay: z
    .nativeEnum(Week, {
      errorMap: () => ({ message: INVALID_FIELD_I18N_KEY }),
    })
    .default(Week.SUNDAY)
    .optional(),
  midweekMeetingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: REQUIRED_FIELD_I18N_KEY,
    })
    .optional(),
  weekendMeetingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: REQUIRED_FIELD_I18N_KEY,
    })
    .optional(),
  onlineMeetingSoftware: z.string().optional(),
  onlineMeetingId: z.string().optional(),
  onlineMeetingDialNumber: z.string().optional(),
  onlineMeetingPassword: z.string().optional(),
  onlineMeetingLink: z.string().optional(),
  circuitName: z.string().optional(),
  circuitOverseerName: z.string().optional(),
  circuitOverseerContact: z.string().optional(),
});
