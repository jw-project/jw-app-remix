import { defer } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';

import { type EventEntity } from '~/entities/event';
import { getEvent } from '~/services/api/congregation/events/events.server';
import { NotFoundError, sendReturnMessage } from '~/services/api/throws-errors';
import type { LoaderDeferredResponse } from '~/services/api/types';
import { ValidatePermissions } from '~/services/api/validate-permissions';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type EventEditLoaderReturn = {
  event: Promise<EventEntity>;
  eventId: string;
};

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs): LoaderDeferredResponse<EventEditLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);
    const { eventId } = params;

    if (!eventId) {
      throw new NotFoundError();
    }

    new ValidatePermissions(permissions, 'events').canRead();

    if (eventId === 'new') {
      return defer({
        event: Promise.resolve({} as EventEntity),
        eventId,
      });
    }

    const event = getEvent({ congregationId, eventId });

    return defer({ event, eventId });
  } catch (error) {
    throw sendReturnMessage(error);
  }
};
