import { Fragment, useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';
import { Outlet, useNavigation } from '@remix-run/react';
import type { LoaderFunction, TypedResponse } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { error } from 'console';

import { BodyMargin } from '~/components/commons/body/body-margin';
import { Menu } from '~/components/menu/menu';
import type { MenuType } from '~/components/menu/types';
import { Navbar } from '~/components/navbar/navbar';
import type { PublisherEntity } from '~/entities/publisher';
import { getMenu } from '~/services/api/menu.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';
import { cacheConfigs } from '~/utils/cache.server';

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
  } catch (e) {
    error(e);

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
  const [show, setShow] = useState(false);
  const { state } = useNavigation();

  useEffect(() => {
    setShow(state === 'idle');
  }, [state]);

  return (
    <>
      <Navbar />
      <Menu />
      <Transition
        as={BodyMargin}
        show={show}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Outlet />
      </Transition>
    </>
  );
}
