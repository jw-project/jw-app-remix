import { useMatches, type UIMatch } from '@remix-run/react';

import { useMenu } from '~/hooks/menu';
import { useUser } from '~/matches/use-user';
import type { RootLoaderReturn } from '~/root.server';

import { Backdrop } from '../commons/backdrop';
import { MenuBody } from './menu-body';
import { Aside, MenuHeader } from './menu-styled';

export function Menu() {
  const [firstMatch] = useMatches() as UIMatch<RootLoaderReturn>[];
  const { permissions } = useUser();
  const { showMenu, closeMenu } = useMenu();

  return (
    <>
      <Aside expanded={showMenu}>
        <MenuHeader>
          Admin
          <b className="font-black">One</b>
        </MenuHeader>
        <MenuBody
          menu={firstMatch?.data.menu || []}
          permissions={permissions}
        />
      </Aside>
      <Backdrop onClick={closeMenu} visible={!showMenu} />
    </>
  );
}
