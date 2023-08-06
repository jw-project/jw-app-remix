import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/server-runtime';

import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import { type EventEntity, eventOptions } from '~/entities/event';
import { useTranslation } from '~/i18n/i18n';
import { getEvent } from '~/services/api/congregation/events/events.server';
import { eventFormSchema } from '~/services/api/congregation/events/validations';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

type EventEditLoaderReturn = {
  event: EventEntity;
  eventId: string;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);
  const { eventId } = params;
  const event = await getEvent({ congregationId, eventId });

  return { event, eventId };
};

export default function EventEdit() {
  const { event, eventId } = useLoaderData<EventEditLoaderReturn>();
  const { translate } = useTranslation('routes.congregation.events');

  return (
    <Card>
      <Form
        key={eventId}
        schema={eventFormSchema}
        defaultValues={event}
        api={`api/congregation/event/${eventId}/save`}
        builder={{
          cols: 1,
          fields: [
            {
              name: 'type',
              label: translate('type'),
              type: 'select',
              options: eventOptions(),
            },
            {
              name: 'name',
              label: translate('name'),
              type: 'text',
            },
            {
              name: 'description',
              label: translate('description'),
              type: 'textarea',
            },
            {
              name: 'link',
              label: translate('link'),
              type: 'text',
            },
            {
              name: 'startDate',
              label: translate('startDate'),
              type: 'date',
            },
            {
              name: 'startTime',
              label: translate('startTime'),
              type: 'time',
            },
            {
              name: 'endDate',
              label: translate('endDate'),
              type: 'date',
            },
            {
              name: 'endTime',
              label: translate('endTime'),
              type: 'time',
            },
          ],
        }}
      />
    </Card>
  );
}
