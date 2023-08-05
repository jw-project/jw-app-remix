import { useMatches } from '@remix-run/react';

import type { PublisherEntity } from '~/entities/publisher';

export function useUser(): PublisherEntity {
  const [
    {
      data: { user },
    },
  ] = useMatches();

  return user;
}
