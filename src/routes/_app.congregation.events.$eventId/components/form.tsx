import { Form } from '~/components/commons/form/form';
import type { EntityForm } from '~/components/commons/form/form-suspense-await';
import { setVoidOptionWhenNew } from '~/components/commons/form/utils';
import { eventOptions, type EventEntity } from '~/entities/event';
import { useRevalidator } from '~/hooks/use-revalidate';
import { useValidatePermissions } from '~/hooks/use-validate-permissions';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import type { EventActionSaveResponse } from '~/routes/api.congregation.events.$eventId.save/route';
import { eventFormSchema } from '~/services/api/congregation/events/validations';

export const EventForm = ({ id, data, disabled }: EntityForm<EventEntity>) => {
  const { permissions } = useUser();
  const { translate } = useTranslation('routes.congregation.events.form');
  const { canWrite } = useValidatePermissions(permissions, 'events');
  const { revalidate, navigate } = useRevalidator();

  const isNew = id === 'new';

  const onSuccess = (response: EventActionSaveResponse) => {
    if (isNew) {
      navigate(`../${response.event.id}`, { mustRevalidate: true });
    } else if (response.needRevalidate) {
      revalidate();
    }
  };

  return (
    <Form
      key={id}
      schema={eventFormSchema}
      defaultValues={data}
      api={`api/congregation/events/${id}/save`}
      disabled={disabled}
      onFormApiSuccess={onSuccess}
      mode={isNew ? 'onSubmit' : 'onChange'}
      builder={{
        disabled: !canWrite,
        cols: 1,
        fields: [
          {
            name: 'type',
            label: translate('type'),
            type: 'select',
            options: setVoidOptionWhenNew(eventOptions(), id),
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
  );
};
