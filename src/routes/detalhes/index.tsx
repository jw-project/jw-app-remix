import { Location, useLoaderData, useLocation } from '@remix-run/react';
import { AlbumType } from '../../types/types';

export const loader: LoaderFunction = async ({ request }) => {
  // console.log('detalhes loader',"request", request, "context", context);

  // const response = await api.get("0b498b01-c20f-49d9-8ab6-edda571b4d62");
  // return response.data.albums;

  console.log('');
  return {};
};

function Detalhes() {
  const invoices = useLoaderData();
  // console.log('detalhes componente',invoices)

  // if(!state)

  return <></>;
}

export default Detalhes;
