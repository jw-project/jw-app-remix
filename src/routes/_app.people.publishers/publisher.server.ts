import type { LoaderFunction } from '@remix-run/server-runtime';

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
