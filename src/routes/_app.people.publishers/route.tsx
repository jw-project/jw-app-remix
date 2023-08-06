import { Outlet } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import {
  DataContainer,
  ListContainer,
  RootListContainer,
} from '~/components/commons/list-screen';

import { PublisherList } from './components';

export { loader } from './publisher.server';

export default function Publishers() {
  return (
    <RootListContainer>
      <ListContainer>
        <Card padded={0}>
          <PublisherList />
        </Card>
      </ListContainer>
      <DataContainer>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
}
