import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type CustomCloseType = {
  onClose?: () => void;
};

type DrawerContextType = {
  drawerIsOpen: boolean;
  openDrawer: (props?: CustomCloseType) => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType>({
  drawerIsOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState<() => void | undefined>();

  function openDrawer(props?: CustomCloseType) {
    if (props?.onClose) {
      setOnClose(() => props.onClose);
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

export const useDrawer = () => useContext(DrawerContext);
