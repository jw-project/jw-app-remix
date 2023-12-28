import { useEffect } from 'react';

export const useBeforeUnload = (enabled: boolean) => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (enabled) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled]);
};
