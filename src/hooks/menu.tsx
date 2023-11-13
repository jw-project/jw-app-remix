import { createContext, useContext, useState } from 'react';

type MenuContextType = {
  showMenu: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext({} as MenuContextType);

export const MenuProvider = ({ children }: React.PropsWithChildren) => {
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

export const useMenu = () => useContext(MenuContext);
