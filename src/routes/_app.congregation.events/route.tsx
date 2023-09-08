import { Outlet, useLoaderData } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import {
  DataContainer,
  ListContainer,
  RootListContainer,
} from '~/components/commons/list-screen';

import { EventList } from './components';
import type { EventsLoaderReturn } from './events.server';

export { loader, shouldRevalidate } from './events.server';

export default function Events() {
  const { events } = useLoaderData<EventsLoaderReturn>();
  const hasData = Boolean(events.length);

  return (
    <RootListContainer>
      <ListContainer show={hasData}>
        <Card padded={0}>
          <EventList />
        </Card>
      </ListContainer>
      <DataContainer full={!hasData}>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
}
