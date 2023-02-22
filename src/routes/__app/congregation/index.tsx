import React, { useEffect } from 'react';

import type {
  ActionFunction,
  LoaderFunction,
  TypedResponse,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { makeDomainFunction } from 'domain-functions';

import { CatchBoundaryComponent } from '~/components/catch-boundary';
import { Card } from '~/components/commons/card';
import { FakeInput } from '~/components/commons/form/fake-input';
import { Form } from '~/components/commons/form/form';
import { Col, Grid } from '~/components/commons/grid';
import type { ToastType } from '~/components/commons/toast';
import { notify } from '~/components/commons/toast';
import { Subtitle } from '~/components/commons/typography';
import type { CongregationEntity } from '~/entities/congregation';
import { weekOptions } from '~/entities/week';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import { checkReturnMessage } from '~/services/api/common.server';
import {
  getCongregation,
  saveCongregation,
} from '~/services/api/congregation/congregation.server';
import { congregationFormSchema as schema } from '~/services/api/congregation/validations';
import type { HttpError } from '~/services/api/throws-errors';

type CongregationActionReturn =
  | {
    message: string;
    messageType?: ToastType;
  }
  | undefined;

export const action: ActionFunction = async ({
  request,
}): Promise<TypedResponse<CongregationActionReturn>> => {
  const mutation = makeDomainFunction(schema)(
    //
    async (values) => saveCongregation(request, values),
  );

  return checkReturnMessage({ request, schema, mutation });
};

type CongregationLoaderReturn = {
  congregation: CongregationEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<CongregationLoaderReturn> => {
  try {
    const congregation = await getCongregation(request);

    return { congregation };
  } catch (error) {
    const { message, status } = error as HttpError;

    throw json({ message }, { status });
  }
};

export default function Congregation() {
  const { translate } = useTranslation('routes.congregation');
  const { translate: translateRoot } = useTranslation();
  const { congregation } = useLoaderData<CongregationLoaderReturn>();
  const dataAction = useActionData<CongregationActionReturn>();
  const { congregationId } = useUser();

  useEffect(() => {
    if (dataAction?.message) {
      notify({
        message: translateRoot(dataAction.message),
        type: dataAction.messageType,
      });
    }
  }, [dataAction]);

  return (
    <Card>
      <Form schema={schema} values={congregation}>
        {({ Field, Button }) => (
          <Grid cols={2}>
            <Col>
              <FakeInput
                value={congregationId}
                label={translate('id')}
                disabled
              />
            </Col>
            <Col>
              <Field name="name" label={translate('name')} />
            </Col>
            <Col>
              <Field name="number" label={translate('number')} type="number" />
            </Col>
            <Col>
              <Field name="address" label={translate('address')} multiline />
            </Col>
            <Col>
              <Field
                name="midweekMeetingDay"
                label={translate('midweek-meeting-day')}
                options={weekOptions()}
              />
            </Col>
            <Col>
              <Field
                name="weekendMeetingDay"
                label={translate('weekend-meeting-day')}
              />
            </Col>
            <Col>
              <Field
                name="midweekMeetingTime"
                label={translate('midweek-meeting-time')}
                type="time"
              />
            </Col>
            <Col>
              <Field
                name="weekendMeetingTime"
                label={translate('weekend-meeting-time')}
                type="time"
              />
            </Col>
            <Col colSpan={2}>
              <Subtitle>{translate('online-meeting-subtitle')}</Subtitle>
            </Col>
            <Col>
              <Field
                name="onlineMeetingSoftware"
                label={translate('online-meeting-software')}
              />
            </Col>
            <Col>
              <Field
                name="onlineMeetingId"
                label={translate('online-meeting-id')}
              />
            </Col>
            <Col>
              <Field
                name="onlineMeetingDialNumber"
                label={translate('online-meeting-dial-number')}
              />
            </Col>
            <Col>
              <Field
                name="onlineMeetingPassword"
                label={translate('online-meeting-password')}
              />
            </Col>
            <Col>
              <Field
                name="onlineMeetingLink"
                label={translate('online-meeting-link')}
              />
            </Col>
            <Col colSpan={2}>
              <Subtitle>{translate('circuit-subtitle')}</Subtitle>
            </Col>
            <Col>
              <Field
                name="circuitName"
                label={translate('circuit-name')}
              />
            </Col>
            <Col>
              <Field
                name="circuitOverseerName"
                label={translate('circuit-overseer-name')}
              />
            </Col>
            <Col>
              <Field
                name="circuitOverseerContact"
                label={translate('circuit-overseer-contact')}
              />
            </Col>
            <Col />
            <Col>
              <Button>{translateRoot('common.save')}</Button>
            </Col>
          </Grid>
        )}
      </Form>
    </Card>
  );
}

export const CatchBoundary = CatchBoundaryComponent;
