import { type ActionFunction } from '@remix-run/server-runtime';

import { deleteEvent } from '~/services/api/congregation/events/events.server';
import { NotFoundError, sendReturnMessage } from '~/services/api/throws-errors';
import type { ActionResponse } from '~/services/api/types';
import { ValidatePermissions } from '~/services/api/validate-permissions';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export const action: ActionFunction = async ({
  request,
  params,
}): ActionResponse<null> => {
  try {
    const { eventId } = params;
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    new ValidatePermissions(permissions, 'events').canWrite();

    if (!eventId) {
      throw new NotFoundError();
    }

    await deleteEvent({
      eventId,
      congregationId,
    });

    return null;
  } catch (error) {
    throw sendReturnMessage(error);
  }
};
