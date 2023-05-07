import { useSetAtom } from 'jotai';
import tailStyled from 'tailwind-styled-components';

import { showMenuAtom } from '~/atoms/global-atoms';

import { Icon } from '../commons/icon';

const MobileAsideButtonStyled = tailStyled.div`
    lg:hidden
    rotate-180
    cursor-pointer
`;

export function MobileAsideButton() {
  const setShowMenu = useSetAtom(showMenuAtom);

  return (
    <MobileAsideButtonStyled onClick={setShowMenu}>
      <Icon icon="menu_open" />
    </MobileAsideButtonStyled>
  );
}
