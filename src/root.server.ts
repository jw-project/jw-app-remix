import type { V2_MetaFunction } from '@remix-run/node';
import type {
  LinksFunction,
  LoaderFunction,
  TypedResponse,
} from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';

import type { Theme } from '~/atoms-global/theme';
import type { TranslationConfig, Translations } from '~/i18n/i18n';
import { getTranslateResources } from '~/i18n/i18next.server';
import {
  firebaseAdminConnection,
  getAuthenticatedUser,
} from '~/services/firebase-connection.server';
import styles from '~/styles/global.css';
import { cacheConfigs } from '~/utils/cache.server';

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
    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,1,200&display=block',
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

  let resources = cacheConfigs.get<Translations>('resources');
  if (!resources) {
    resources = await getTranslateResources();
    cacheConfigs.set('resources', resources);
  }
  let theme: Theme = 'light';
  let language = request.headers.get('accept-language')?.split(',')[0] || 'en';

  try {
    const { theme: userTheme, language: userLanguage } =
      await getAuthenticatedUser(request);

    theme = userTheme || 'light';
    language = userLanguage;
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
