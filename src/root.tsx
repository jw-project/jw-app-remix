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
import { Provider } from 'jotai';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ClientOnly } from 'remix-utils';
import { BodyMargin } from './components/body-margin';
import { Menu } from './components/menu';
import { Navbar } from './components/navbar';
import { i18nextServerConfig } from './i18n/i18next.server';
import { getMenu } from './services/api/menu.server';
import {
  verifyIsAuthenticated,
} from './services/firebase-connection.server';
import styles from './tailwind.css';
import type { RootLoaderReturn } from './types/types';

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

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18nextServerConfig.getLocale(request);

  const url = new URL(request.url);
  const isLoginPath = url.pathname === '/login';

  if (isLoginPath) {
    return { isLoginPath, locale };
  }

  try {
    await verifyIsAuthenticated(request);
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }

  const rootLoaderReturn: RootLoaderReturn = {
    menu: await getMenu(),
    isLoginPath,
    locale,
  };

  return rootLoaderReturn;
};

export default function App() {
  const { isLoginPath, locale } = useLoaderData<RootLoaderReturn>();
  const { i18n } = useTranslation('routes', { keyPrefix: 'login' });

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);

  return (
    <html lang={locale} dir={i18n.dir()}>
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
