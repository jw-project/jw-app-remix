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

import { languageAtom } from '~/atoms-global/language';
import { isSavingAtom } from '~/atoms-global/saving';
import { themeAtom } from '~/atoms-global/theme';

import { Toast } from '../toast/toast';

export const Body = () => {
  const theme = useAtomValue(themeAtom);
  const language = useAtomValue(languageAtom);
  const isSaving = useAtomValue(isSavingAtom);

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
        <Toast />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
