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
    { label: translate(Week.MONDAY).toString(), value: Week.MONDAY },
    { label: translate(Week.TUESDAY).toString(), value: Week.TUESDAY },
    { label: translate(Week.WEDNESDAY).toString(), value: Week.WEDNESDAY },
    { label: translate(Week.THURSDAY).toString(), value: Week.THURSDAY },
    { label: translate(Week.FRIDAY).toString(), value: Week.FRIDAY },
    { label: translate(Week.SATURDAY).toString(), value: Week.SATURDAY },
    { label: translate(Week.SUNDAY).toString(), value: Week.SUNDAY },
  ];
};
