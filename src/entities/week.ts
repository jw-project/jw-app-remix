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

  return Object.values(Week).map((day) => ({
    label: translate(day).toString(),
    value: day,
  }));
};
