import type { V2_MetaFunction } from '@remix-run/node';
import type {
  LinksFunction,
  LoaderFunction,
  TypedResponse,
} from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import { error } from 'console';

import type { TranslationConfig, Translations } from '~/i18n/i18n';
import { getTranslateResources } from '~/i18n/i18next.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';
import styles from '~/styles/global.css';
import { cacheConfigs } from '~/utils/cache.server';

import type { MenuType } from './components/menu/types';
import type { PublisherEntity } from './entities/publisher';
import type { Theme } from './global-context/theme';
import { getMenu } from './services/api/menu.server';
import { getPath } from './utils/get-path.server';

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
  menu: MenuType[];
  user?: PublisherEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<TypedResponse<RootLoaderReturn>> => {
  let resources = cacheConfigs.get<Translations>('resources');
  if (!resources) {
    resources = await getTranslateResources();
    cacheConfigs.set('resources', resources);
  }
  let theme: Theme = 'light';
  let language = request.headers.get('accept-language')?.split(',')[0] || 'en';
  let user: PublisherEntity | undefined = undefined;
  let menu = cacheConfigs.get<MenuType[]>('menu') || [];

  if (getPath(request) !== '/login') {
    try {
      user = await getAuthenticatedUser(request);

      if (user.theme) {
        ({ theme } = user);
      }
      if (user.language) {
        ({ language } = user);
      }

      if (!menu.length) {
        menu = await getMenu();
        cacheConfigs.set('menu', menu);
      }
    } catch (e) {
      error(e);

      return redirect('/login');
    }
  }

  const locale: TranslationConfig = {
    defaultLanguage: language,
    fallbackLanguage: language,
    translations: resources,
  };

  return json({
    locale,
    themeMode: theme,
    user,
    menu,
  });
};
