import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { languageAtom } from '~/atoms-global/language';
import { themeAtom } from '~/atoms-global/theme';

export const Body = () => {
  const theme = useAtomValue(themeAtom);
  const language = useAtomValue(languageAtom);

  return (
    <html
      lang={language.defaultLanguage}
      dir={language.defaultLanguage}
      className={theme}
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
