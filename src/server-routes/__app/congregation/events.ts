import { type LoaderFunction, json } from '@remix-run/server-runtime';

import type { EventEntity } from '~/entities/event';
import { listEvents } from '~/services/api/congregation/events/events.server';
import { canRead } from '~/services/api/permissions.server';
import type { HttpError } from '~/services/api/throws-errors';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type EventsLoaderReturn = {
  events: Array<EventEntity>;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<EventsLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    canRead(permissions, 'events');

    const events = await listEvents({ congregationId });

    return { events };
  } catch (error) {
    const { message, status } = error as HttpError;

    throw json({ message }, { status });
  }
};
