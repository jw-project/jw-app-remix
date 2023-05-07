import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';

import { showMenuAtom } from '~/atoms-global/menu';
import { themeAtom } from '~/atoms-global/theme';

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
  const changeThemeAtom = useSetAtom(themeAtom);

  const changeTheme = async () => {
    const theme = changeThemeAtom();
    try {
      await axios.post('/api/save-theme', { theme });
    } catch (error) {}
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
