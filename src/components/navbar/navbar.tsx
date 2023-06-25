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
  return (
    <NavbarBase id="navbar-main">
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

        <NavbarItem divider>
          <Notifications />
        </NavbarItem>

        <NavbarItem>
          <Avatar name="AB" />
        </NavbarItem>
      </NavbarEnd>
    </NavbarBase>
  );
}
