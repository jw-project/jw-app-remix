import type { DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import React from 'react';
import { useSetAtom } from 'jotai';
import { getMenu } from '~/services/api/menu.server';
import { firebaseAdminConnection, verifyIsAuthenticated } from '~/services/firebase-connection.server';
import { changeAtom } from './atom';
import { Menu } from '../components/menu';
import { Navbar } from '../components/navbar';

export async function loader({ request }: DataFunctionArgs) {
  firebaseAdminConnection();

  try {
    await verifyIsAuthenticated(request);
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }

  const menu = await getMenu();

  return { menu };
}

export default function Index() {
  const changeColor = useSetAtom(changeAtom);
  changeColor();

  return (
    <>
      <Navbar />
      <Menu />
    </>
  );
}
