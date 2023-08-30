import type { LoaderArgs } from '@remix-run/server-runtime';

import type { EventEntity } from '~/entities/event';
import { getEvent } from '~/services/api/congregation/events/events.server';
import { NotFoundError, sendReturnMessage } from '~/services/api/throws-errors';
import { ValidatePermissions } from '~/services/api/validate-permissions';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type EventEditLoaderReturn = {
  event: EventEntity;
  eventId: string;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);
    const { eventId } = params;

    if (!eventId) {
      throw new NotFoundError();
    }

    new ValidatePermissions(permissions, 'events').canRead();

    const event = await getEvent({ congregationId, eventId });

    return { event, eventId };
  } catch (error) {
    throw sendReturnMessage(error);
  }
};
