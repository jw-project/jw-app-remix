import { useMemo } from 'react';

import { useLoaderData } from '@remix-run/react';
import { Provider, createStore } from 'jotai';

import { languageAtom } from './atoms-global/language';
import { themeAtom } from './atoms-global/theme';
import { Body } from './components/commons/body/body';
import { SavingProvider } from './hooks/saving';
import type { RootLoaderReturn } from './root.server';

export { loader, links, meta } from './root.server';

export default function App() {
  const { locale, themeMode } = useLoaderData<RootLoaderReturn>();
  const store = useMemo(() => {
    const newStore = createStore();
    newStore.set(themeAtom, themeMode);
    newStore.set(languageAtom, locale);

    return newStore;
  }, [themeMode, locale]);

  return (
    <Provider store={store}>
      <SavingProvider>
        <Body />
      </SavingProvider>
    </Provider>
  );
}
