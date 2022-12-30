import type { LoaderFunction } from '@remix-run/node';
import {
  Form, Location, useLoaderData, useLocation,
} from '@remix-run/react';
import { Button } from '~/components/commons/button';
import { Card } from '~/components/commons/card';
import { Input } from '~/components/commons/form/input';
import type { FieldGridType } from '~/components/commons/grid';
import { Grid } from '~/components/commons/grid';
import { AlbumType } from '../../types/types';

export const loader: LoaderFunction = async ({ request }) => {
  // console.log('detalhes loader',"request", request, "context", context);

  // const response = await api.get("0b498b01-c20f-49d9-8ab6-edda571b4d62");
  // return response.data.albums;

  console.log('');
  return {};
};

export default function Congregation() {
  const invoices = useLoaderData();
  // console.log('detalhes componente',invoices)

  // if(!state)

  const grid: FieldGridType = [
    { children: <Input label="Congregação Id" name="id" disabled /> },
    { children: <Input label="Nome" name="name" /> },
    { children: <Input label="Número" name="number" type="number" /> },
    { children: <div className="border">01</div> },
    { children: <div className="border">01</div>, colSpan: 2 },
    { children: <Button>Salvar</Button> },
  ];

  return (
    <Card>
      <Grid cols={2} grids={grid} />
    </Card>
  );
}
