import { useMemo } from 'react';

import { useLoaderData } from '@remix-run/react';
import { Provider, createStore } from 'jotai';

import { languageAtom } from './atoms-global/language';
import { themeAtom } from './atoms-global/theme';
import { Body } from './components/commons/body/body';
import type { RootLoaderReturn } from './server-routes/root.server';

export { loader, links, meta } from './server-routes/root.server';

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
      <Body />
    </Provider>
  );
}
