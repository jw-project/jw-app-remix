import type { SelectOptionsType } from '~/components/commons/form/select';
import { useTranslation as translation } from '~/i18n/i18n';

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
  const { translate } = translation('enum.week');

  return [
    { name: translate(Week.MONDAY), value: Week.MONDAY },
    { name: translate(Week.TUESDAY), value: Week.TUESDAY },
    { name: translate(Week.WEDNESDAY), value: Week.WEDNESDAY },
    { name: translate(Week.THURSDAY), value: Week.THURSDAY },
    { name: translate(Week.FRIDAY), value: Week.FRIDAY },
    { name: translate(Week.SATURDAY), value: Week.SATURDAY },
    { name: translate(Week.SUNDAY), value: Week.SUNDAY },
  ];
};
