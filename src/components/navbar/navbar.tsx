import { useMatches, useSubmit } from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { showMenuAtom } from '~/atoms/global-atoms';

import { Avatar } from './avatar';
import { MobileAsideButton } from './mobile-aside-button';
import {
  NavbarBase,
  NavbarEnd,
  NavbarItem,
  NavbarStart,
} from './navbar-styled';
import { Notifications } from './notifications';

export function Navbar() {
  const showMenu = useAtomValue(showMenuAtom);
  const submit = useSubmit();
  const matches = useMatches();

  const changeTheme = () => {
    submit(
      { changeTheme: 'true', route: matches.pop()?.pathname || '/' },
      {
        method: 'post',
      },
    );
  };

  return (
    <NavbarBase id="navbar-main" $expanded={showMenu}>
      <NavbarStart>
        <NavbarItem>
          <MobileAsideButton />
        </NavbarItem>
      </NavbarStart>

      <NavbarEnd>
        <NavbarItem>
          <button onClick={changeTheme}>mudar theme</button>
        </NavbarItem>

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
