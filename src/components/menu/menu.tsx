import { useMatches } from '@remix-run/react';

import { useMenu } from '~/hooks/menu';
import { useUser } from '~/matches/use-user';

import { Backdrop } from '../commons/backdrop';
import { MenuBody } from './menu-body';
import { Aside, MenuHeader } from './menu-styled';

export function Menu() {
  const [
    {
      data: { menu },
    },
  ] = useMatches();
  const { permissions } = useUser();
  const { showMenu, closeMenu } = useMenu();

  return (
    <>
      <Aside expanded={showMenu}>
        <MenuHeader>
          Admin
          <b className="font-black">One</b>
        </MenuHeader>
        <MenuBody menu={menu} permissions={permissions} />
      </Aside>
      <Backdrop onClick={closeMenu} visible={!showMenu} />
    </>
  );
}
