import React, { createContext, useContext, useEffect, useState } from 'react';

import { useNavigation } from '@remix-run/react';

export type Theme = 'light' | 'dark';

const TransitionContext = createContext<{
  show: boolean;
  toggleTransition: () => void;
}>({
  show: true,
  toggleTransition: () => {},
});

export const TransitionProvider = ({ children }: React.PropsWithChildren) => {
  const [show, setShow] = useState(true);
  const { state } = useNavigation();

  useEffect(() => {
    // only happens effect when the routes are base routes
    if (state === 'idle') {
      setShow(true);
    }
  }, [state]);

  const toggleTransition = () => {
    setShow((current) => !current);
  };

  return (
    <TransitionContext.Provider value={{ show, toggleTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
