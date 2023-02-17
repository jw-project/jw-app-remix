import React from 'react';

import { useAtomValue } from 'jotai';

import { showMenuAtom } from '~/atoms/global-atoms';

import { Avatar } from './avatar';
import { MobileAsideButton } from './mobile-aside-button';
import {
  NavbarBase,
  NavbarStart,
  NavbarItem,
  NavbarEnd,
} from './navbar-styled';
import { Notifications } from './notifications';

export function Navbar() {
  const showMenu = useAtomValue(showMenuAtom);

  return (
    <NavbarBase id="navbar-main" $expanded={showMenu}>
      <NavbarStart>
        <NavbarItem>
          <MobileAsideButton />
        </NavbarItem>
      </NavbarStart>

      <NavbarEnd>
        <NavbarItem $withDivider>
          <Notifications />
        </NavbarItem>

        <NavbarItem>
          <Avatar name="AB" />
        </NavbarItem>
      </NavbarEnd>
    </NavbarBase>
  );
}
