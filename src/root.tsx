import { json, redirect } from '@remix-run/node';
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  TypedResponse,
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
import { getMessaging } from 'firebase-admin/messaging';
import { Provider } from 'jotai';

import type { TranslationConfig, Translations } from './i18n/i18n';
import { getTranslateResources } from './i18n/i18next.server';
import { firebaseAdminConnection } from './services/firebase-connection.server';
import { getSessionTheme, saveSessionTheme } from './services/theme.server';
import styles from './tailwind.css';
import { cacheConfigs } from './utils/cache';

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
    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,1,200',
  },
];

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  return redirect(formData.get('route')?.toString() || '/', {
    headers: {
      'Set-Cookie': await saveSessionTheme(request),
    },
  });
};

export type RootLoaderReturn = {
  locale: TranslationConfig;
  themeMode: 'dark' | 'light';
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<TypedResponse<RootLoaderReturn>> => {
  firebaseAdminConnection();

  // TODO test firebase messaging
  getMessaging()
    .subscribeToTopic('REMOTE_CONFIG_PUSH', 'REMOTE_CONFIG_PUSH')
    .then((response) => {
      console.log('Successfully subscribed to topic:', response);
    })
    .catch((error) => {
      console.log('Error subscribing to topic:', error);
    });

  let resources = cacheConfigs.get<Translations>('resources');
  if (!resources) {
    resources = await getTranslateResources();
    cacheConfigs.set('resources', resources);
  }

  const languageDetected =
    params.language ||
    request.headers.get('x-language') ||
    (request.headers.get('accept-language') &&
      request.headers.get('accept-language')?.split(',')[0]) ||
    'en';
  const locale: TranslationConfig = {
    defaultLanguage: languageDetected,
    fallbackLanguage: languageDetected,
    translations: resources,
  };

  const themeMode = await getSessionTheme(request);

  return json({
    locale,
    themeMode,
  });
};

export default function App() {
  const { locale, themeMode } = useLoaderData<RootLoaderReturn>();

  return (
    <html lang={locale.defaultLanguage} dir={locale.defaultLanguage}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={themeMode}>
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
