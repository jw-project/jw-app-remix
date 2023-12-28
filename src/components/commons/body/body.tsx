import { useEffect } from 'react';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

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

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSaving]);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (isSaving) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  return (
    <html lang={defaultLanguage} dir={defaultLanguage} className={theme}>
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
