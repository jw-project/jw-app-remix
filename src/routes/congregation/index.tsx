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

const schema = z.object({
  // id: z
  //   .string(),
  name: z.string().min(1, { message: 'Nome é um campo obrigatório' }),
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
  const congregation = await getCongregation();

  return { congregation };
};

export default function Congregation() {
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
              <FakeInput value="xxx" label="Id da congregação" disabled />
            </Col>
            <Col>
              <Field name="name" label="Nome da congregação" />
            </Col>
            <Col>
              <Field
                name="number"
                label="Número da congregação"
                type="number"
              />
            </Col>
            <Col>
              <Field
                name="address"
                label="Endereço do Salão do Reino"
                multiline
              />
            </Col>
            <Col>
              <Field
                name="midweekMeetingDay"
                label="Dia da reunião de meio de semana"
                options={weekOptions}
              />
            </Col>
            <Col>
              <Field
                name="weekendMeetingDay"
                label="Dia da reunião de fim de semana"
                options={weekOptions}
              />
            </Col>
            <Col>
              <Button>salve</Button>
            </Col>
            <Errors />
          </Grid>
        )}
      </Form>
    </Card>
  );
}
