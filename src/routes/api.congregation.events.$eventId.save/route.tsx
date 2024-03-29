import { type ActionFunction } from '@remix-run/server-runtime';

import type { EventEntity } from '~/entities/event';
import { checkIfValuesChanged } from '~/services/api/common.server';
import {
  getEvent,
  saveEvent,
} from '~/services/api/congregation/events/events.server';
import { eventFormSchema } from '~/services/api/congregation/events/validations';
import { NotFoundError, sendReturnMessage } from '~/services/api/throws-errors';
import type { ActionResponse } from '~/services/api/types';
import { ValidatePermissions } from '~/services/api/validate-permissions';
import { validateSchema } from '~/services/api/validate-schema';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type EventActionSaveResponse = {
  event: EventEntity;
  needRevalidate: boolean;
};

export const action: ActionFunction = async ({
  request,
  params,
}): ActionResponse<EventActionSaveResponse> => {
  try {
    const { eventId } = params;
    const eventReq: EventEntity = await request.json();
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    validateSchema(eventFormSchema, eventReq);

    new ValidatePermissions(permissions, 'events').canWrite();

    if (!eventId) {
      throw new NotFoundError();
    }

    if (eventId === 'new') {
      const newEvent = await saveEvent({
        event: eventReq,
        eventId,
        congregationId,
      });

      return {
        event: await getEvent({ eventId: newEvent.id, congregationId }),
        needRevalidate: true,
      };
    }

    const oldEvent = await getEvent({ eventId, congregationId });

    await saveEvent({
      event: eventReq,
      eventId,
      congregationId,
    });

    const event = await getEvent({ eventId, congregationId });

    return {
      event,
      needRevalidate: checkIfValuesChanged(oldEvent, event, ['name', 'type']),
    };
  } catch (error) {
    throw sendReturnMessage(error);
  }
};
