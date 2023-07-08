import { useSetAtom } from 'jotai';
import { w } from 'windstitch';

import { showMenuAtom } from '~/atoms-global/menu';

import { Icon } from '../commons/icon';

const MobileAsideButtonStyled = w.div(`
    lg:hidden
    rotate-180
    cursor-pointer
    dark:text-white
`);

export function MobileAsideButton() {
  const setShowMenu = useSetAtom(showMenuAtom);

  return (
    <MobileAsideButtonStyled onClick={setShowMenu}>
      <Icon icon="menu_open" />
    </MobileAsideButtonStyled>
  );
}
