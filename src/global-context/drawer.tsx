import { createContext, useState, type PropsWithChildren } from 'react';

import { useSave } from '~/hooks/use-save';

export type OpenDrawerProps = {
  onClose?: () => void;
  mustRevalidate?: boolean;
};

type DrawerContextType = {
  drawerIsOpen: boolean;
  openDrawer: (props?: OpenDrawerProps) => void;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextType>({
  drawerIsOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState<() => void | undefined>();
  const { forceRevalidate } = useSave();

  function openDrawer(props?: OpenDrawerProps) {
    if (props?.onClose) {
      setOnClose(() => props.onClose);
    }
    if (props?.mustRevalidate) {
      forceRevalidate();
    }
    setIsOpen(true);
  }

  function closeDrawer() {
    onClose?.();
    setIsOpen(false);
  }

  return (
    <DrawerContext.Provider
      value={{ drawerIsOpen: isOpen, openDrawer, closeDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
