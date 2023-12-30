import { useRef } from 'react';

import { useMatches, type UIMatch } from '@remix-run/react';

import { useMenu } from '~/hooks/use-menu';
import { useOutsideClick } from '~/hooks/use-outside-click';
import { useUser } from '~/hooks/use-user';
import type { RootLoaderReturn } from '~/root.server';

import { MenuBody } from './menu-body';
import { Aside, MenuHeader } from './menu-styled';

export function Menu() {
  const [firstMatch] = useMatches() as UIMatch<RootLoaderReturn>[];
  const { permissions } = useUser();
  const { showMenu, closeMenu } = useMenu();
  const menuRef = useRef<HTMLElement>(null);
  useOutsideClick(menuRef, closeMenu);

  return (
    <>
      <Aside expanded={showMenu} ref={menuRef}>
        <MenuHeader>
          Admin
          <b className="font-black">One</b>
        </MenuHeader>
        <MenuBody
          menu={firstMatch?.data.menu || []}
          permissions={permissions}
        />
      </Aside>
    </>
  );
}
