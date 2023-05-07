import { useMemo } from 'react';

import { json } from '@remix-run/node';
import type {
  LinksFunction,
  LoaderFunction,
  TypedResponse,
  V2_MetaFunction,
} from '@remix-run/node';
import { Links, Meta, useLoaderData } from '@remix-run/react';
import { getMessaging } from 'firebase-admin/messaging';
import { Provider, createStore } from 'jotai';

import type { Theme } from './atoms-global/theme';
import { themeAtom } from './atoms-global/theme';
import { Body } from './components/commons/body/body';
import type { TranslationConfig, Translations } from './i18n/i18n';
import { getTranslateResources } from './i18n/i18next.server';
import {
  firebaseAdminConnection,
  getAuthenticatedUser,
} from './services/firebase-connection.server';
import styles from './styles/global.css';
import { cacheConfigs } from './utils/cache';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  ];
};

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

export type RootLoaderReturn = {
  locale: TranslationConfig;
  themeMode: 'dark' | 'light';
};

export const loader: LoaderFunction = async ({
  request,
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
  let theme: Theme = 'light';
  let language = request.headers.get('accept-language')?.split(',')[0] || 'en';
  try {
    ({ theme, language } = await getAuthenticatedUser(request));
  } catch (error) {}

  const locale: TranslationConfig = {
    defaultLanguage: language,
    fallbackLanguage: language,
    translations: resources,
  };

  return json({
    locale,
    themeMode: theme,
  });
};

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
