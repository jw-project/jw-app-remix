import { createContext, useState, type PropsWithChildren } from 'react';

type MenuContextType = {
  showMenu: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const MenuContext = createContext({} as MenuContextType);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((current) => !current);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <MenuContext.Provider value={{ showMenu, toggleMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};