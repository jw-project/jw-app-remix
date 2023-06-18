import { useMemo } from 'react';

import { Links, Meta, useLoaderData } from '@remix-run/react';
import { Provider, createStore } from 'jotai';

import { themeAtom } from './atoms-global/theme';
import { Body } from './components/commons/body/body';
import type { RootLoaderReturn } from './server-routes/root.server';

export { loader, links, meta } from './server-routes/root.server';

export default function App() {
  const { locale, themeMode } = useLoaderData<RootLoaderReturn>();
  const store = useMemo(() => {
    const newStore = createStore();
    newStore.set(themeAtom, themeMode);

    return newStore;
  }, [themeMode]);

  return (
    <html lang={locale.defaultLanguage} dir={locale.defaultLanguage}>
      <head>
        <Meta />
        <Links />
      </head>
      <Provider store={store}>
        <Body />
      </Provider>
    </html>
  );
}
