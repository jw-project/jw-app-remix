import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { Button } from '~/components/commons/button';
import { Card } from '~/components/commons/card';
import { Input } from '~/components/commons/form/input';
import { Select } from '~/components/commons/form/select';
import { TextArea } from '~/components/commons/form/text-area';
import type { FieldGridType } from '~/components/commons/grid';
import { Grid } from '~/components/commons/grid';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { Week, weekOptions } from '~/entities/week';
import { notify, ToastType } from '~/components/commons/toast';
import { useEffect } from 'react';

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Nome é um campo obrigatório' }),
    number: z.string().min(1, { message: 'Número é um campo obrigatório' }),
    address: z.string().min(1, { message: 'Endereço é um campo obrigatório' }),
    midweekMeetingDay: z.nativeEnum(Week, { required_error: 'Valor inválido' }),
    weekendMeetingDay: z.nativeEnum(Week, { required_error: 'Valor inválido' }),
  }),
);

export const action: ActionFunction = async ({ request }) => {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }
  const {
    name, address, number, midweekMeetingDay, weekendMeetingDay,
  } = data.data;

  return { message: 'Salvo com sucesso' };
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log('');

  return {};
};

export default function Congregation() {
  const invoices = useLoaderData();
  const data = useActionData();
  const transition = useTransition();

  useEffect(() => {
    if (data?.message) {
      notify({ message: data.message });
    }
  }, [data]);

  const grid: FieldGridType = [
    { children: <Input label="Congregação Id" name="id" disabled /> },
    {
      children: <Input label="Nome da congregação" name="name" />,
    },
    {
      children: (
        <Input label="Número da congregação" name="number" type="number" />
      ),
    },
    {
      children: <TextArea label="Endereço do salão do reino" name="address" />,
    },
    {
      children: (
        <Select
          label="Dia da reunião de meio de semana"
          name="midweekMeetingDay"
          options={weekOptions}
        />
      ),
    },
    {
      children: (
        <Select
          label="Dia da reunião de fim de semana"
          name="weekendMeetingDay"
          options={weekOptions}
        />
      ),
    },

    { children: <div className="border">01</div> },
    { children: <>{JSON.stringify(transition)}</>, colSpan: 2 },
    {
      children: <Button disabled={transition.state !== 'idle'}>Salvar</Button>,
    },
  ];

  return (
    <Card>
      <ValidatedForm validator={validator} method="post">
        <Grid cols={2} grids={grid} />
      </ValidatedForm>
    </Card>
  );
}
