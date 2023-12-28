import { useEffect } from 'react';

import { useLoaderData } from '@remix-run/react';

import { FormSuspenseAwait } from '~/components/commons/form/form-suspense-await';
import { useDrawer } from '~/hooks/use-drawer';
import { useRevalidator } from '~/hooks/use-revalidate';

import { EventForm } from './components/form';
import type { loader } from './event-id.server';

export { loader } from './event-id.server';

export default function EventEdit() {
  const { event: promiseEvent, eventId } = useLoaderData<typeof loader>();
  const { navigate } = useRevalidator();
  const { drawerIsOpen, openDrawer } = useDrawer();

  useEffect(() => {
    if (!drawerIsOpen) {
      openDrawer({
        onClose: () => {
          navigate('../');
        },
      });
    }
  }, []);

  return (
    <FormSuspenseAwait resolve={promiseEvent} form={EventForm} id={eventId} />
  );
}
