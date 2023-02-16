import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Outlet } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import type { UserRecord } from 'firebase-admin/auth';
import { ClientOnly } from 'remix-utils';

import { BodyMargin } from '~/components/body-margin';
import { Menu } from '~/components/menu';
import type { MenuType } from '~/components/menu/types';
import { Navbar } from '~/components/navbar';
import { getMenu } from '~/services/api/menu.server';
import { verifyIsAuthenticated } from '~/services/firebase-connection.server';

export type RootLoaderReturn = {
  menu: MenuType[];
};

export const loader: LoaderFunction = async ({ request }) => {
  let user: UserRecord;
  try {
    user = await verifyIsAuthenticated(request);
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }

  return {
    menu: await getMenu(),
  };
};

export default function Layout() {
  return (
    <>
      <ClientOnly>{() => <Toaster />}</ClientOnly>
      <Navbar />
      <Menu />
      <BodyMargin>
        <Outlet />
      </BodyMargin>
    </>
  );
}
