import { useLoaderData } from '@remix-run/react';
import { useAtom } from 'jotai';

import { showMenuAtom } from '~/atoms-global/menu';
import type { LayoutLoaderReturn } from '~/routes/__app';

import { Backdrop } from '../commons/backdrop';
import { MenuBody } from './menu-body';
import { Aside, MenuHeader } from './menu-styled';

export function Menu() {
  const { menu, user } = useLoaderData<LayoutLoaderReturn>();
  const [showMenu, setShowMenu] = useAtom(showMenuAtom);

  return (
    <>
      <Aside $expanded={showMenu}>
        <MenuHeader>
          Admin
          <b className="font-black">One</b>
        </MenuHeader>
        <MenuBody menu={menu} permissions={user.permissions} />
      </Aside>
      <Backdrop onClick={() => setShowMenu()} visible={!showMenu} />
    </>
  );
}
