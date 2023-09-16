import { Outlet, useLoaderData } from '@remix-run/react';

import { DeleteButton, NewButton } from '~/components/commons/button';
import { Card } from '~/components/commons/card';
import {
  ButtonContainer,
  DataContainer,
  ListContainer,
  RootListContainer,
  ScrollContainer,
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
        <ButtonContainer>
          <NewButton />
        </ButtonContainer>
        <ScrollContainer>
          <Card padded={0}>
            <EventList />
          </Card>
        </ScrollContainer>
      </ListContainer>
      <ScrollContainer>
        <DataContainer full={!hasData}>
          <Outlet />
        </DataContainer>
      </ScrollContainer>
    </RootListContainer>
  );
}
