import { useAtomValue } from 'jotai';

import { showMenuAtom } from '~/atoms-global/menu';

import { Avatar } from './avatar';
import { ChangeTheme } from './change-theme';
import { MobileAsideButton } from './mobile-aside-button';
import {
  NavbarBase,
  NavbarEnd,
  NavbarItem,
  NavbarStart,
} from './navbar-styled';
import { Notifications } from './notifications';
import { SavingIndicator } from './saving-indicator';

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
        <NavbarItem>
          <SavingIndicator />
        </NavbarItem>

        <NavbarItem>
          <ChangeTheme />
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
