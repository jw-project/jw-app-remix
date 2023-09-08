import { useLoaderData } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import { setVoidOptionWhenNew } from '~/components/commons/form/utils';
import { eventOptions } from '~/entities/event';
import { useRevalidator } from '~/hooks/revalidate';
import { useValidatePermissions } from '~/hooks/use-validate-permissions';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import { eventFormSchema } from '~/services/api/congregation/events/validations';

import type { EventActionSaveResponse } from '../api.congregation.events.$eventId.save/route';
import type { EventEditLoaderReturn } from './event-id.server';

export { loader } from './event-id.server';

export default function EventEdit() {
  const { event, eventId } = useLoaderData<EventEditLoaderReturn>();
  const { permissions } = useUser();
  const { translate } = useTranslation('routes.congregation.events');
  const { canWrite } = useValidatePermissions(permissions, 'events');
  const { revalidate, navigate } = useRevalidator();

  const onSuccess = (response: EventActionSaveResponse) => {
    if (eventId === 'new') {
      navigate(`../${response.event.id}`);
    } else if (response.needRevalidate) {
      revalidate();
    }
  };

  return (
    <Card>
      <Form
        key={eventId}
        schema={eventFormSchema}
        defaultValues={event}
        api={`api/congregation/events/${eventId}/save`}
        onFormApiSuccess={onSuccess}
        builder={{
          disabled: !canWrite,
          cols: 1,
          fields: [
            {
              name: 'type',
              label: translate('type'),
              type: 'select',
              options: setVoidOptionWhenNew(eventOptions(), eventId),
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
              label: translate('start_date'),
              type: 'date',
            },
            {
              name: 'startTime',
              label: translate('start_time'),
              type: 'time',
            },
            {
              name: 'endDate',
              label: translate('end_date'),
              type: 'date',
            },
            {
              name: 'endTime',
              label: translate('end_time'),
              type: 'time',
            },
          ],
        }}
      />
    </Card>
  );
}
