import { useTranslation as getTranslation } from 'react-i18next';
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

export const weekOptions = (): SelectOptionsType[] => {
  const { t } = getTranslation('enum', { keyPrefix: 'week' });

  return [
    { name: t(Week.MONDAY), value: Week.MONDAY },
    { name: t(Week.TUESDAY), value: Week.TUESDAY },
    { name: t(Week.WEDNESDAY), value: Week.WEDNESDAY },
    { name: t(Week.THURSDAY), value: Week.THURSDAY },
    { name: t(Week.FRIDAY), value: Week.FRIDAY },
    { name: t(Week.SATURDAY), value: Week.SATURDAY },
    { name: t(Week.SUNDAY), value: Week.SUNDAY },
  ];
};
