import type { PropsWithChildren } from 'react';

import { useDrawer } from '~/hooks/drawer';
import { useIsMobile } from '~/hooks/is-mobile';

import {
  DrawerFooter,
  type DrawerFooterGenericExtends,
  type DrawerFooterProps,
} from './drawer-footer';
import { DrawerHeader } from './drawer-header';
import {
  DrawerContentStyled,
  DrawerWrapperStyled,
  type DrawerWrapperStyledType,
} from './styled';

export function Drawer<T extends DrawerFooterGenericExtends = Array<any>>({
  children,
  size,
  internalNavigator,
}: PropsWithChildren<
  {
    size?: DrawerWrapperStyledType['size'];
  } & {
    internalNavigator?: DrawerFooterProps<T>;
  }
>) {
  const { drawerIsOpen } = useDrawer();
  const isMobile = useIsMobile();

  return (
    <DrawerWrapperStyled open={drawerIsOpen} size={isMobile ? 'full' : size}>
      <DrawerHeader />
      <DrawerContentStyled>{children}</DrawerContentStyled>
      {internalNavigator && (
        <DrawerFooter
          navigatorData={internalNavigator.navigatorData}
          paramKey={internalNavigator.paramKey}
        />
      )}
    </DrawerWrapperStyled>
  );
}
