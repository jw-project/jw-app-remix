import type { ShouldRevalidateFunction } from '@remix-run/react';
import { type LoaderFunction } from '@remix-run/server-runtime';

import type { EventEntity } from '~/entities/event';
import { listEvents } from '~/services/api/congregation/events/events.server';
import { sendReturnMessage } from '~/services/api/throws-errors';
import type { ActionResponse } from '~/services/api/types';
import { ValidatePermissions } from '~/services/api/validate-permissions';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type EventsLoaderReturn = {
  events: Array<EventEntity>;
};

export const loader: LoaderFunction = async ({
  request,
}): ActionResponse<EventsLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    new ValidatePermissions(permissions, 'events').canRead();

    const events = await listEvents({ congregationId });

    return { events };
  } catch (error) {
    throw sendReturnMessage(error);
  }
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  defaultShouldRevalidate,
}) => {
  if (currentParams?.eventId === 'new') {
    return true;
  }

  return defaultShouldRevalidate;
};
