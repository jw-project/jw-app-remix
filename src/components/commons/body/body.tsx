import { useEffect } from 'react';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { themeAtom } from '~/atoms-global/theme';
import { useLanguage } from '~/global-context/language';
import { useSave } from '~/hooks/saving';

import { Toast } from '../toast/toast';

export const Body = () => {
  const theme = useAtomValue(themeAtom);
  const { defaultLanguage } = useLanguage();
  const { isSaving } = useSave();

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
      <body>
        <Outlet />
        <Toast />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
