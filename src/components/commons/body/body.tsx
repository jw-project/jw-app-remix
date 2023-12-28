import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { useBeforeUnload } from '~/hooks/use-before-unload';
import { useDrawer } from '~/hooks/use-drawer';
import { useLanguage } from '~/hooks/use-language';
import { useSave } from '~/hooks/use-save';
import { useTheme } from '~/hooks/use-theme';

import { Backdrop } from '../backdrop';
import { Toast } from '../toast/toast';

export const Body = () => {
  const { theme } = useTheme();
  const { defaultLanguage } = useLanguage();
  const { isSaving } = useSave();
  const { drawerIsOpen, closeDrawer } = useDrawer();

  useBeforeUnload(isSaving);

  return (
    <html lang={defaultLanguage} className={theme}>
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ overflow: drawerIsOpen ? 'hidden' : 'auto' }}>
        <Backdrop visible={!drawerIsOpen} onClick={closeDrawer} />
        <Outlet />
        <Toast />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
