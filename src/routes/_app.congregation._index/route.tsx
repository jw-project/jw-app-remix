import { useLoaderData } from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { isSavingAtom } from '~/atoms-global/saving';
import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import { weekOptions } from '~/entities/week';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import { congregationFormSchema } from '~/services/api/congregation/validations';

import type { CongregationActionSaveResponse } from '../api.congregation.save/route';
import type { CongregationLoaderReturn } from './congregation.server';

export { loader } from './congregation.server';

export default function Congregation() {
  const { translate } = useTranslation('routes.congregation');
  const { translate: commonTranslate } = useTranslation('common');
  const { congregationId } = useUser();
  const isSaving = useAtomValue(isSavingAtom);
  const congregationActive = Boolean(congregationId);
  const { congregation } = useLoaderData<CongregationLoaderReturn>();

  const onSuccess = (e: CongregationActionSaveResponse) => {
    if (e.needReload) {
      window.location.reload();
    }
  };

  return (
    <Card>
      <Form
        schema={congregationFormSchema}
        defaultValues={congregation}
        api="api/congregation/save"
        onFormApiSuccess={onSuccess}
        mode={congregationActive ? 'onChange' : 'onSubmit'}
        fields={[
          {
            name: 'id',
            label: translate('id'),
            type: 'text',
            disabled: true,
            visible: congregationActive,
          },
          {
            name: 'name',
            label: translate('name'),
            type: 'text',
            visible: true,
          },
          {
            name: 'number',
            label: translate('number'),
            type: 'number',
            visible: true,
          },
          {
            name: 'address',
            label: translate('address'),
            type: 'textarea',
            visible: congregationActive,
          },
          {
            name: 'midweekMeetingDay',
            label: translate('midweek-meeting-day'),
            type: 'select',
            options: weekOptions(),
            visible: congregationActive,
          },
          {
            name: 'weekendMeetingDay',
            label: translate('weekend-meeting-day'),
            type: 'select',
            options: weekOptions(),
            visible: congregationActive,
          },
          {
            name: 'midweekMeetingTime',
            label: translate('midweek-meeting-time'),
            type: 'time',
            visible: congregationActive,
          },
          {
            name: 'weekendMeetingTime',
            label: translate('weekend-meeting-time'),
            type: 'time',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingSubtitle',
            label: translate('online-meeting-subtitle'),
            type: 'subtitle',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingSoftware',
            label: translate('online-meeting-software'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingId',
            label: translate('online-meeting-id'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingDialNumber',
            label: translate('online-meeting-dial-number'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingPassword',
            label: translate('online-meeting-password'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingLink',
            label: translate('online-meeting-link'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'circuitSubtitle',
            label: translate('circuit-subtitle'),
            type: 'subtitle',
            visible: congregationActive,
          },
          {
            name: 'circuitName',
            label: translate('circuit-name'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'circuitOverseerName',
            label: translate('circuit-overseer-name'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'circuitOverseerContact',
            label: translate('circuit-overseer-contact'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'submit',
            label: commonTranslate('save'),
            type: 'submit',
            visible: !congregationActive,
            disabled: isSaving,
          },
        ]}
      />
    </Card>
  );
}
