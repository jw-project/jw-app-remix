import React from 'react';

import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { Provider } from 'jotai';

import type { Translations } from './i18n/i18n';
import { TranslationConfig } from './i18n/i18n';
import { getTranslateResources } from './i18n/i18next.server';
import { firebaseAdminConnection } from './services/firebase-connection.server';
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
  locale: TranslationConfig;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<RootLoaderReturn> => {
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

  return {
    locale,
  };
};

export default function App() {
  const { locale } = useLoaderData<RootLoaderReturn>();

  return (
    <html lang={locale.defaultLanguage} dir={locale.defaultLanguage}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Provider>
      </body>
    </html>
  );
}
