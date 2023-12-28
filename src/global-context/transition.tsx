import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { useNavigation } from '@remix-run/react';

export type Theme = 'light' | 'dark';

export const TransitionContext = createContext<{
  show: boolean;
  toggleTransition: () => void;
}>({
  show: true,
  toggleTransition: () => {},
});

export const TransitionProvider = ({ children }: PropsWithChildren) => {
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
