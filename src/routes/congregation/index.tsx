import React, { useEffect } from 'react';

import type {
  ActionFunction,
  LoaderFunction,
  TypedResponse,
} from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { makeDomainFunction } from 'domain-functions';
import { z } from 'zod';

import { Card } from '~/components/commons/card';
import { FakeInput } from '~/components/commons/form/fake-input';
import { Form } from '~/components/commons/form/form';
import { Col, Grid } from '~/components/commons/grid';
import { notify } from '~/components/commons/toast';
import { Week, weekOptions } from '~/entities/week';
import { useTranslation } from '~/i18n/i18n';
import { checkReturnMessage } from '~/services/api/common.server';
import {
  getCongregation,
  updateCongregation,
} from '~/services/api/congregation.server';
import type {
  CongregationActionReturn,
  CongregationLoaderReturn,
} from '~/types/types';

const schema = z.object({
  name: z.string().min(1, { message: 'requiredField' }),
  number: z.preprocess(
    (input) => (typeof input === 'number' ? input : 0),
    z.number().gt(0, { message: 'requiredField' }),
  ),
  address: z.string().min(1, { message: 'requiredField' }),
  midweekMeetingDay: z
    .nativeEnum(Week, {
      errorMap: () => ({ message: 'invalidField' }),
    })
    .default(Week.MONDAY),
  weekendMeetingDay: z
    .nativeEnum(Week, {
      errorMap: () => ({ message: 'invalidField' }),
    })
    .default(Week.MONDAY),
});

export const action: ActionFunction = async ({
  request,
}): Promise<TypedResponse<CongregationActionReturn>> => {
  const mutation = makeDomainFunction(schema)(async (values) => updateCongregation(values));

  return checkReturnMessage({ request, schema, mutation });
};

export const loader: LoaderFunction = async (): Promise<CongregationLoaderReturn> => {
  const congregation = await getCongregation();

  return { congregation };
};

export default function Congregation() {
  const { translate } = useTranslation('routes.congregation');

  const { congregation } = useLoaderData<CongregationLoaderReturn>();
  const dataAction = useActionData<CongregationActionReturn>();

  useEffect(() => {
    if (dataAction?.message) {
      notify({ message: dataAction.message, type: dataAction.messageType });
    }
  }, [dataAction]);

  return (
    <Card>
      <Form schema={schema} values={congregation}>
        {({ Field, Errors, Button }) => (
          <Grid cols={2}>
            <Col>
              <FakeInput value="xxx" label={translate('id')} disabled />
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
            <Errors />
          </Grid>
        )}
      </Form>
    </Card>
  );
}
