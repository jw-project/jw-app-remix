import type { SelectOptionsType } from '~/components/commons/form/select';

export enum Week {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const weekOptions: SelectOptionsType[] = [
  { name: 'Segunda', value: Week.MONDAY },
  { name: 'Terça', value: Week.TUESDAY },
  { name: 'Quarta', value: Week.WEDNESDAY },
  { name: 'Quinta', value: Week.THURSDAY },
  { name: 'Sexta', value: Week.FRIDAY },
  { name: 'Sábado', value: Week.SATURDAY },
  { name: 'Domingo', value: Week.SUNDAY },
];
