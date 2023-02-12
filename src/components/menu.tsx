import React from 'react';

import { useLoaderData } from '@remix-run/react';
import { useAtom } from 'jotai';

import { showMenuAtom } from '~/atoms/global-atoms';
import type { RootLoaderReturn } from '~/types/types';

import { Backdrop } from './commons/backdrop';
import { Aside, MenuHeader } from './menu/menu';
import { MenuBody } from './menu/menu-body';

export function Menu() {
  const { menu } = useLoaderData<RootLoaderReturn>() || { menu: [] };
  const [showMenu, setShowMenu] = useAtom(showMenuAtom);

  return (
    <>
      <Aside $expanded={showMenu}>
        <MenuHeader>
          Admin
          <b className="font-black">One</b>
        </MenuHeader>
        <MenuBody menu={menu} />
      </Aside>
      <Backdrop onClick={() => setShowMenu()} visible={!showMenu} />
    </>
  );
}
