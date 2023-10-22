import { Outlet } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import {
  DataContainer,
  ListContainer,
  RootListContainer,
} from '~/components/commons/list-screen/styled';

import { PublisherList } from './components';

export { loader } from './publisher.server';

export default function Publishers() {
  return (
    <RootListContainer>
      <ListContainer show>
        <Card padded={0}>
          <PublisherList />
        </Card>
      </ListContainer>
      <DataContainer full={false}>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
}
