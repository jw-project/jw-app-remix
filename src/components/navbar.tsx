import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { showMenuAtom } from '~/atoms/global-atoms';
import { Avatar } from './navbar/avatar';
import { MobileAsideButton } from './navbar/mobile-aside-button';
import {
  NavbarBase,
  NavbarStart,
  NavbarItem,
  NavbarEnd,
} from './navbar/navbar';
import { Notifications } from './navbar/notifications';



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
