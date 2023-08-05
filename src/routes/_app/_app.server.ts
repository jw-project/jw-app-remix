import type { LoaderFunction, TypedResponse } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { error } from 'console';

import type { MenuType } from '~/components/menu/types';
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
