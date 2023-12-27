import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type DrawerContextType = {
  drawerIsOpen: boolean;
  openDrawer: (props?: { onClose?: () => void }) => void;
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

  const openDrawer = (props?: { onClose?: () => void }) => {
    if (props?.onClose) {
      setOnClose(() => props.onClose);
    }
    setIsOpen(true);
  };

  const closeDrawer = useCallback(() => {
    onClose?.();
    setIsOpen(false);
  }, [onClose]);

  return (
    <DrawerContext.Provider
      value={{ drawerIsOpen: isOpen, openDrawer, closeDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
