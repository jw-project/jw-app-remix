import React, { useEffect } from 'react';

import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  LoadingSubtitle,
  LoadingTitle,
  Overlay,
  Spinner,
} from '~/components/login/login';
import { sessionLogin } from '~/services/firebase-connection.server';

export const action: ActionFunction = async ({ request }) => redirect('/', {
  headers: {
    'Set-Cookie': await sessionLogin(request),
  },
});

const translate = (a) => a;

export default function Login() {
  const fetcher = useFetcher();
  // const { translate } = useTranslation();

  const redirectToLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then(() => {})
      .catch(() => {});
  };

  const checkUser = () => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          fetcher.submit(
            { token: user.accessToken },
            {
              method: 'post',
            },
          );
        } else {
          redirectToLogin();
        }
      },
      undefined,
      () => {
        unsubscribe();
      },
    );
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overlay>
      <Spinner />
      <LoadingTitle>{translate('wait')}</LoadingTitle>
      <LoadingSubtitle>{translate('description')}</LoadingSubtitle>
    </Overlay>
  );
}
