import { useLoaderData, useNavigate } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import { eventOptions } from '~/entities/event';
import { useValidatePermissions } from '~/hooks/use-validate-permissions';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import { eventFormSchema } from '~/services/api/congregation/events/validations';

import type { EventEditLoaderReturn } from './event-id.server';

export { loader } from './event-id.server';

export default function EventEdit() {
  const { event, eventId } = useLoaderData<EventEditLoaderReturn>();
  const { permissions } = useUser();
  const { translate } = useTranslation('routes.congregation.events');
  const { canWrite } = useValidatePermissions(permissions, 'events');
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('.', { replace: true });
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
