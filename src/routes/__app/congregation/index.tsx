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
  const mutation = makeDomainFunction(schema)(//
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
              <FakeInput value={congregationId} label={translate('id')} disabled />
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
                label={translate('midweekMeetingDay')}
                options={[...weekOptions(), { name: 'fs', value: '1' }]}
              />
            </Col>
            <Col>
              <Field
                name="weekendMeetingDay"
                label={translate('weekendMeetingDay')}
                options={weekOptions()}
              />
            </Col>
            <Col>
              <Button>{translate('save')}</Button>
            </Col>
          </Grid>
        )}
      </Form>
    </Card>
  );
}

export const CatchBoundary = CatchBoundaryComponent;
