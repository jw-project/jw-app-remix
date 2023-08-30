import { w } from 'windstitch';

import { useMenu } from '~/hooks/menu';

import { Icon } from '../commons/icon';

const MobileAsideButtonStyled = w.div(`
    lg:hidden
    rotate-180
    cursor-pointer
    dark:text-white
`);

export function MobileAsideButton() {
  const { toggleMenu } = useMenu();

  return (
    <MobileAsideButtonStyled onClick={toggleMenu}>
      <Icon icon="menu_open" />
    </MobileAsideButtonStyled>
  );
}
