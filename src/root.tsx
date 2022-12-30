import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
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
import { BodyMargin } from './components/body-margin';
import { Menu } from './components/menu';
import { Navbar } from './components/navbar';
import { getMenu } from './services/api/menu.server';
import { firebaseAdminConnection, verifyIsAuthenticated } from './services/firebase-connection.server';
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
    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const isLoginPath = url.pathname === '/login';

  firebaseAdminConnection();

  if (isLoginPath) {
    return { isLoginPath };
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
  };

  return rootLoaderReturn;
};

export default function App() {
  const { isLoginPath } = useLoaderData<RootLoaderReturn>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider>
          {isLoginPath ? <Outlet /> : (
            <>
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
