import type { SelectOptionsType } from '~/components/commons/form/select';
import { useTranslation as translation } from '~/i18n/i18n';

export enum EventType {
  CIRCUIT_OVERSEER = 'CIRCUIT_OVERSEER',
  CIRCUIT_ASSEMBLY = 'CIRCUIT_ASSEMBLY',
  CONVENTION = 'CONVENTION',
  MEMORIAL = 'MEMORIAL',
  MEETING_DAY_CHANGE = 'MEETING_DAY_CHANGE',
  NO_MEETING = 'NO_MEETING',
  SERVICE_OVERSEER_VISIT = 'SERVICE_OVERSEER_VISIT',
  OTHER = 'OTHER',
}

export const eventOptions = (): SelectOptionsType[] => {
  const { translate } = translation('enum.event_type');

  return [
    {
      label: translate(EventType.CIRCUIT_OVERSEER).toString(),
      value: EventType.CIRCUIT_OVERSEER,
    },
    {
      label: translate(EventType.CIRCUIT_ASSEMBLY).toString(),
      value: EventType.CIRCUIT_ASSEMBLY,
    },
    {
      label: translate(EventType.CONVENTION).toString(),
      value: EventType.CONVENTION,
    },
    {
      label: translate(EventType.MEMORIAL).toString(),
      value: EventType.MEMORIAL,
    },
    {
      label: translate(EventType.MEETING_DAY_CHANGE).toString(),
      value: EventType.MEETING_DAY_CHANGE,
    },
    {
      label: translate(EventType.NO_MEETING).toString(),
      value: EventType.NO_MEETING,
    },
    {
      label: translate(EventType.SERVICE_OVERSEER_VISIT).toString(),
      value: EventType.SERVICE_OVERSEER_VISIT,
    },
    {
      label: translate(EventType.OTHER).toString(),
      value: EventType.OTHER,
    },
  ];
};

export type EventEntity = {
  id: string;
  type: EventType;
  name: string;
  description: string;
  link: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};
