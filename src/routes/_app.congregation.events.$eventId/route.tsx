import { useEffect } from 'react';

import { useLoaderData, useOutletContext } from '@remix-run/react';

import type { DrawerOutletContext } from '~/components/commons/drawer/types';
import { FormSuspenseAwait } from '~/components/commons/form/form-suspense-await';

import { EventForm } from './components/form';
import type { loader } from './event-id.server';

export { loader } from './event-id.server';

export default function EventEdit() {
  const { event: promiseEvent, eventId } = useLoaderData<typeof loader>();
  const { formDrawerRef } = useOutletContext<DrawerOutletContext>();

  useEffect(() => {
    if (!formDrawerRef.current?.isOpen) {
      formDrawerRef.current?.openDrawer();
    }
  }, []);

  return (
    <FormSuspenseAwait resolve={promiseEvent} form={EventForm} id={eventId} />
  );
}
