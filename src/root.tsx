import React from 'react';
import { Toaster } from 'react-hot-toast';

import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { UserRecord } from 'firebase-admin/auth';
import { Provider } from 'jotai';
import { ClientOnly } from 'remix-utils';

import { BodyMargin } from './components/body-margin';
import { Menu } from './components/menu';
import type { MenuType } from './components/menu/types';
import { Navbar } from './components/navbar';
import type { Translations } from './i18n/i18n';
import { TranslationConfig } from './i18n/i18n';
import { getTranslateResources } from './i18n/i18next.server';
import { getMenu } from './services/api/menu.server';
import {
  firebaseAdminConnection,
  verifyIsAuthenticated,
} from './services/firebase-connection.server';
import styles from './tailwind.css';
import { cache } from './utils/cache';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded',
  },
];

export type RootLoaderReturn = {
  isLoginPath: boolean;
  menu: MenuType[];
  locale: TranslationConfig;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  firebaseAdminConnection();

  let resources = cache.get<Translations>('resources');
  if (!resources) {
    resources = await getTranslateResources();
    cache.set('resources', resources);
  }

  const locale = new TranslationConfig({
    defaultLanguage:
      params.language
      || request.headers.get('x-language')
      || (request.headers.get('accept-language')
        && request.headers.get('accept-language')?.split(',')[0])
      || 'en',
  }).addAllTranslations(resources);

  const url = new URL(request.url);
  const isLoginPath = url.pathname === '/login';

  if (isLoginPath) {
    return { isLoginPath, locale };
  }

  // const start = performance.now();
  let user: UserRecord;
  try {
    user = await verifyIsAuthenticated(request);
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }

  const rootLoaderReturn: RootLoaderReturn = {
    menu: await getMenu(),
    isLoginPath,
    locale,
  };
  // const end = performance.now();
  // const time = (end - start) / 1000;

  // console.log(`Tempo de execução: ${time} segundos.`);
  return rootLoaderReturn;
};

export default function App() {
  const { isLoginPath, locale } = useLoaderData<RootLoaderReturn>();

  return (
    <html lang={locale.defaultLanguage} dir={locale.defaultLanguage}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider>
          {isLoginPath ? (
            <Outlet />
          ) : (
            <>
              <ClientOnly>{() => <Toaster />}</ClientOnly>
              <Navbar />
              <Menu />
              <BodyMargin>
                <Outlet />
              </BodyMargin>
            </>
          )}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Provider>
      </body>
    </html>
  );
}
