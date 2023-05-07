import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { themeAtom } from '~/atoms-global/theme';

export const Body = () => {
  const theme = useAtomValue(themeAtom);

  return (
    <body className={theme}>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
};
