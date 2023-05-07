import { Outlet } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';

import { Card } from '~/components/commons/card';
import { PublisherList } from '~/components/publishers/publisher-list';
import {
  PublisherContainer,
  PublisherDataContainer,
  PublisherListContainer,
} from '~/components/publishers/publishers-styles';
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
    <PublisherContainer>
      <PublisherListContainer>
        <Card padded={0}>
          <PublisherList />
        </Card>
      </PublisherListContainer>
      <PublisherDataContainer>
        <Outlet />
      </PublisherDataContainer>
    </PublisherContainer>
  );
}
