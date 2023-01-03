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
  { label: 'Segunda', value: Week.MONDAY },
  { label: 'Terça', value: Week.TUESDAY },
  { label: 'Quarta', value: Week.WEDNESDAY },
  { label: 'Quinta', value: Week.THURSDAY },
  { label: 'Sexta', value: Week.FRIDAY },
  { label: 'Sábado', value: Week.SATURDAY },
  { label: 'Domingo', value: Week.SUNDAY },
];
