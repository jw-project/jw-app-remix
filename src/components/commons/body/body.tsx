import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { useBeforeUnload } from '~/hooks/use-before-unload';
import { useLanguage } from '~/hooks/use-language';
import { useSave } from '~/hooks/use-save';
import { useTheme } from '~/hooks/use-theme';

import { Backdrop } from '../backdrop';
import { Toast } from '../toast/toast';

export const Body = () => {
  const { theme, backdropIsShow } = useTheme();
  const { defaultLanguage } = useLanguage();
  const { isSaving } = useSave();

  useBeforeUnload(isSaving);

  return (
    <html lang={defaultLanguage} className={theme}>
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ overflow: backdropIsShow ? 'hidden' : 'auto' }}>
        <Backdrop />
        <Outlet />
        <Toast />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
