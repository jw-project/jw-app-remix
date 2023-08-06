import { Outlet } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import {
  DataContainer,
  ListContainer,
  RootListContainer,
} from '~/components/commons/list-screen';

import { EventList } from './components';

export { loader } from './events.server';

export default function Events() {
  return (
    <RootListContainer>
      <ListContainer>
        <Card padded={0}>
          <EventList />
        </Card>
      </ListContainer>
      <DataContainer>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
}
