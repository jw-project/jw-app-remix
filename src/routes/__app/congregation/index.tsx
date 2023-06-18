import { useEffect } from 'react';

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { savingData } from '~/atoms-global/saving';
import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import { Input } from '~/components/commons/form/input';
import { Select } from '~/components/commons/form/select';
import { TextArea } from '~/components/commons/form/text-area';
import { Col, Grid } from '~/components/commons/grid';
import type { ToastType } from '~/components/commons/toast';
import { Subtitle } from '~/components/commons/typography';
import type { CongregationEntity } from '~/entities/congregation';
import { weekOptions } from '~/entities/week';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import { getCongregation } from '~/services/api/congregation/congregation.server';
import { congregationFormSchema as schema } from '~/services/api/congregation/validations';
import type { HttpError } from '~/services/api/throws-errors';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

type CongregationActionReturn =
  | {
      message: string;
      messageType?: ToastType;
    }
  | undefined;

type CongregationLoaderReturn = {
  congregation: CongregationEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<CongregationLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);
    const congregation = await getCongregation({ congregationId, permissions });

    return { congregation };
  } catch (error) {
    const { message, status } = error as HttpError;

    throw json({ message }, { status });
  }
};

export default function Congregation() {
  const { translate } = useTranslation('routes.congregation');
  const { translate: translateRoot } = useTranslation();
  const a = useAtomValue(savingData);
  const { congregation } = useLoaderData<CongregationLoaderReturn>();
  const dataAction = useActionData<CongregationActionReturn>();
  const { congregationId } = useUser();

  // useEffect(() => {
  //   if (dataAction?.message) {
  //     notify({
  //       message: translateRoot(dataAction.message),
  //       type: dataAction.messageType,
  //     });
  //   }
  // }, [dataAction]);

  return (
    <Card>
      <Form
        schema={schema}
        defaultValues={congregation}
        api="api/congregation/save"
      >
        <Grid cols={2}>
          <Col>
            <Input
              name="id"
              value={congregationId}
              label={translate('id')}
              disabled
            />
          </Col>
          <Col>
            <Input name="name" label={translate('name')} />
          </Col>
          <Col>
            <Input name="number" label={translate('number')} type="number" />
          </Col>
          <Col>
            <TextArea name="address" label={translate('address')} />
          </Col>
          <Col>
            <Select
              name="midweekMeetingDay"
              label={translate('midweek-meeting-day')}
              options={weekOptions()}
            />
          </Col>
          <Col>
            <Select
              name="weekendMeetingDay"
              label={translate('weekend-meeting-day')}
              options={weekOptions()}
            />
          </Col>
          <Col>
            <Input
              name="midweekMeetingTime"
              label={translate('midweek-meeting-time')}
              type="time"
            />
          </Col>
          <Col>
            <Input
              name="weekendMeetingTime"
              label={translate('weekend-meeting-time')}
              type="time"
            />
          </Col>
          <Col colSpan={2}>
            <Subtitle>{translate('online-meeting-subtitle')}</Subtitle>
          </Col>
          <Col>
            <Input
              name="onlineMeetingSoftware"
              label={translate('online-meeting-software')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingId"
              label={translate('online-meeting-id')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingDialNumber"
              label={translate('online-meeting-dial-number')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingPassword"
              label={translate('online-meeting-password')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingLink"
              label={translate('online-meeting-link')}
            />
          </Col>
          <Col colSpan={2}>
            <Subtitle>{translate('circuit-subtitle')}</Subtitle>
          </Col>
          <Col>
            <Input name="circuitName" label={translate('circuit-name')} />
          </Col>
          <Col>
            <Input
              name="circuitOverseerName"
              label={translate('circuit-overseer-name')}
            />
          </Col>
          <Col>
            <Input
              name="circuitOverseerContact"
              label={translate('circuit-overseer-contact')}
            />
          </Col>
          <Col />
        </Grid>
      </Form>
    </Card>
  );
}
