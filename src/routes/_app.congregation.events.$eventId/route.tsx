import { Suspense, useEffect } from 'react';

import { Await, useLoaderData } from '@remix-run/react';

import { useDrawer } from '~/hooks/drawer';
import { useRevalidator } from '~/hooks/revalidate';

import { EventForm } from './components/form';
import type { loader } from './event-id.server';

export { loader } from './event-id.server';

export default function EventEdit() {
  const { event, eventId } = useLoaderData<typeof loader>();

  const { navigate } = useRevalidator();
  const { openDrawer } = useDrawer();

  useEffect(() => {
    openDrawer({
      onClose: () => {
        navigate('../');
      },
    });
  }, []);

  return (
    <Suspense fallback={<EventForm eventId="loading" disabled />}>
      <Await resolve={event}>
        {(event) => <EventForm event={event} eventId={eventId} />}
      </Await>
    </Suspense>
  );
}
