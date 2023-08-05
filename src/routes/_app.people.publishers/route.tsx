import { Outlet } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';

import { Card } from '~/components/commons/card';
import {
  DataContainer,
  ListContainer,
  RootListContainer,
} from '~/components/commons/list-screen';
import { PublisherList } from '~/components/publishers/publisher-list';
import type { PublisherEntity } from '~/entities/publisher';
import { listPublisher } from '~/services/api/publisher/publisher.server';

export type PublishersLoaderReturn = {
  publishers: PublisherEntity[];
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<PublishersLoaderReturn> => {
  const publishers = await listPublisher(request);

  return { publishers };
};

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
