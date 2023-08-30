import { useMemo } from 'react';

import { useLoaderData } from '@remix-run/react';
import { Provider, createStore } from 'jotai';

import { themeAtom } from './atoms-global/theme';
import { Body } from './components/commons/body/body';
import { LanguageProvider } from './global-context/language';
import { MenuProvider } from './hooks/menu';
import { SavingProvider } from './hooks/saving';
import type { RootLoaderReturn } from './root.server';

export { loader, links, meta } from './root.server';

export default function App() {
  const { locale, themeMode } = useLoaderData<RootLoaderReturn>();
  const store = useMemo(() => {
    const newStore = createStore();
    newStore.set(themeAtom, themeMode);

    return newStore;
  }, [themeMode, locale]);

  return (
    <Provider store={store}>
      <LanguageProvider {...locale}>
        <SavingProvider>
          <MenuProvider>
            <Body />
          </MenuProvider>
        </SavingProvider>
      </LanguageProvider>
    </Provider>
  );
}
