import type { PropsWithChildren } from 'react';

import { useDrawer } from '~/hooks/drawer';
import { useIsMobile } from '~/hooks/is-mobile';

import { Icon } from '../icon';
import {
  DrawerCloseButton,
  DrawerWrapper,
  type DrawerWrapperStyledType,
} from './styled';

export const Drawer = ({
  children,
  size,
}: PropsWithChildren<{ size?: DrawerWrapperStyledType['size'] }>) => {
  const { drawerIsOpen, closeDrawer } = useDrawer();
  const isMobile = useIsMobile();

  return (
    <DrawerWrapper open={drawerIsOpen} size={isMobile ? 'full' : size}>
      <DrawerCloseButton onClick={closeDrawer}>
        <Icon icon="close" className="transition-none" />
      </DrawerCloseButton>
      {children}
    </DrawerWrapper>
  );
};
