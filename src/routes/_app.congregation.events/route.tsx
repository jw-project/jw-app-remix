import { useMemo } from 'react';

import { useLoaderData } from '@remix-run/react';

import { ListScreen } from '~/components/commons/list-screen';
import { useTranslation } from '~/i18n/i18n';

import type { EventsLoaderReturn } from './events.server';

export { loader, shouldRevalidate } from './events.server';

export default function Events() {
  const { events } = useLoaderData<EventsLoaderReturn>();
  const { translate } = useTranslation('enum.event-type');

  const dataMapped = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      subName: `${translate(event.type)}`,
    }));
  }, [events]);

  return <ListScreen data={dataMapped} />;
}
