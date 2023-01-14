import type {
  ActionFunction,
  LoaderFunction,
  TypedResponse,
} from '@remix-run/node';
import { z } from 'zod';
import { useActionData, useLoaderData } from '@remix-run/react';
import { Card } from '~/components/commons/card';
import { Col, Grid } from '~/components/commons/grid';
import { Week, weekOptions } from '~/entities/week';
import { notify } from '~/components/commons/toast';
import { useEffect } from 'react';
import {
  getCongregation,
  updateCongregation,
} from '~/services/api/congregation.server';
import type {
  CongregationActionReturn,
  CongregationLoaderReturn,
} from '~/types/types';
import { makeDomainFunction } from 'domain-functions';
import { Form } from '~/components/commons/form/form';
import { checkReturnMessage } from '~/services/api/common.server';
import { FakeInput } from '~/components/commons/form/fake-input';
import { useTranslation as getTranslation } from 'react-i18next';
import { i18nBasicConfig } from '~/i18n/i18n';

const schema = z.object({
  // name: z.string().min(1, { message: tCommon('requiredField', { name: tScreen('name') }) }),
  number: z.preprocess(
    (input) => (typeof input === 'number' ? input : 0),
    z.number().gt(0, { message: 'Número é um campo obrigatório' }),
  ),
  address: z.string().min(1, { message: 'Endereço é um campo obrigatório' }),
  midweekMeetingDay: z
    .nativeEnum(Week, { required_error: 'Valor inválido' })
    .default(Week.MONDAY),
  weekendMeetingDay: z
    .nativeEnum(Week, { required_error: 'Valor inválido' })
    .default(Week.MONDAY),
});

export const action: ActionFunction = async ({
  request,
}): Promise<TypedResponse<CongregationActionReturn>> => {
  const mutation = makeDomainFunction(schema)(async (values) => updateCongregation(values));

  return checkReturnMessage({ request, schema, mutation });
};

export const loader: LoaderFunction = async (): Promise<CongregationLoaderReturn> => {
  const t = await i18nBasicConfig.getFixedT(request);
  console.log(tCommon('requiredField', { name: 'Nome do campo' }));
  const congregation = await getCongregation();

  return { congregation };
};

export default function Congregation() {
  const { t: tScreen } = getTranslation('routes', { keyPrefix: 'congregation' });
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
              <FakeInput value="xxx" label={tScreen('id')} disabled />
            </Col>
            <Col>
              <Field name="name" label={tScreen('name')} />
            </Col>
            <Col>
              <Field
                name="number"
                label={tScreen('number')}
                type="number"
              />
            </Col>
            <Col>
              <Field
                name="address"
                label={tScreen('address')}
                multiline
              />
            </Col>
            <Col>
              <Field
                name="midweekMeetingDay"
                label={tScreen('midweekMeetingDay')}
                options={weekOptions()}
              />
            </Col>
            <Col>
              <Field
                name="weekendMeetingDay"
                label={tScreen('weekendMeetingDay')}
                options={weekOptions()}
              />
            </Col>
            <Col>
              <Button>{tScreen('save')}</Button>
            </Col>
            <Errors />
          </Grid>
        )}
      </Form>
    </Card>
  );
}
