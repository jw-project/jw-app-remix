import { type LoaderFunction } from '@remix-run/server-runtime';

import type { EventEntity } from '~/entities/event';
import { listEvents } from '~/services/api/congregation/events/events.server';
import { canRead } from '~/services/api/permissions.server';
import { sendReturnMessage } from '~/services/api/throws-errors';
import type { ActionResponse } from '~/services/api/types';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type EventsLoaderReturn = {
  events: Array<EventEntity>;
};

export const loader: LoaderFunction = async ({
  request,
}): ActionResponse<EventsLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    canRead(permissions, 'events');

    const events = await listEvents({ congregationId });

    return { events };
  } catch (error) {
    return sendReturnMessage(error);
  }
};
