import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { useIsMobile } from '~/hooks/use-is-mobile';
import { useTheme } from '~/hooks/use-theme';

type MenuContextType = {
  showMenu: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const MenuContext = createContext({} as MenuContextType);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [showMenu, setShowMenu] = useState(false);
  const { showBackdrop, hideBackdrop } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  const toggleMenu = () => {
    showBackdrop({ zIndex: 20 });
    setShowMenu((current) => !current);
  };

  const closeMenu = () => {
    hideBackdrop();
    setShowMenu(false);
  };

  return (
    <MenuContext.Provider value={{ showMenu, toggleMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
