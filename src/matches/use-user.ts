import { useMatches, type UIMatch } from '@remix-run/react';

import type { PublisherEntity } from '~/entities/publisher';
import type { RootLoaderReturn } from '~/root.server';

export function useUser(): PublisherEntity {
  const [firstMatch] = useMatches() as UIMatch<RootLoaderReturn>[];

  if (!firstMatch || !firstMatch.data.user) {
    throw new Error('user not found');
  }

  return firstMatch.data.user;
}
