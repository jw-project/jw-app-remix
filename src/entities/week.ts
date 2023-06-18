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
    { label: translate(Week.MONDAY), value: Week.MONDAY },
    { label: translate(Week.TUESDAY), value: Week.TUESDAY },
    { label: translate(Week.WEDNESDAY), value: Week.WEDNESDAY },
    { label: translate(Week.THURSDAY), value: Week.THURSDAY },
    { label: translate(Week.FRIDAY), value: Week.FRIDAY },
    { label: translate(Week.SATURDAY), value: Week.SATURDAY },
    { label: translate(Week.SUNDAY), value: Week.SUNDAY },
  ];
};
