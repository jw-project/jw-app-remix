import { Outlet } from '@remix-run/react';
import type { LoaderFunction, TypedResponse } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { Toaster } from 'react-hot-toast';
import { ClientOnly } from 'remix-utils';

import { BodyMargin } from '~/components/commons/body/body-margin';
import { Menu } from '~/components/menu/menu';
import type { MenuType } from '~/components/menu/types';
import { Navbar } from '~/components/navbar/navbar';
import type { PublisherEntity } from '~/entities/publisher';
import { getMenu } from '~/services/api/menu.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';
import { cacheConfigs } from '~/utils/cache';

export type LayoutLoaderReturn = {
  menu: MenuType[];
  user: PublisherEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LayoutLoaderReturn | TypedResponse<never>> => {
  let user: PublisherEntity;
  try {
    user = await getAuthenticatedUser(request);
  } catch (error) {
    console.error(error);

    return redirect('/login');
  }

  let menu = cacheConfigs.get<MenuType[]>('menu');
  if (!menu) {
    menu = await getMenu();
    cacheConfigs.set('menu', menu);
  }

  return { menu, user };
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
