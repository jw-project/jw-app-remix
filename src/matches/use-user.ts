import { useMatches, type UIMatch } from '@remix-run/react';

import type { PublisherEntity } from '~/entities/publisher';
import type { RootLoaderReturn } from '~/root.server';

export function useUser(): PublisherEntity {
  const [
    {
      data: { user },
    },
  ] = useMatches() as UIMatch<RootLoaderReturn>[];

  return user;
}
