import React, { useEffect } from 'react';

import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { FirebaseOptions } from 'firebase/app';
import type { User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';

import {
  LoadingSubtitle,
  LoadingTitle,
  Overlay,
  Spinner,
} from '~/components/login/login';
import { useTranslation } from '~/i18n/i18n';
import { firebaseClientConnection } from '~/services/firebase-connection.client';
import { sessionLogin } from '~/services/firebase-connection.server';

export const action: ActionFunction = async ({ request }) =>
  redirect('/', {
    headers: {
      'Set-Cookie': await sessionLogin(request),
    },
  });

type LoginLoaderReturn = {
  firebaseOptions: FirebaseOptions;
};

export const loader: LoaderFunction = (): LoginLoaderReturn => ({
  firebaseOptions: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
});

export default function Login() {
  const fetcher = useFetcher();
  const { firebaseOptions } = useLoaderData<LoginLoaderReturn>();
  const { translate } = useTranslation('routes.login');

  const redirectToLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).catch(() => {
      signInWithRedirect(auth, provider)
        .then(() => {})
        .catch(() => {});
    });
  };

  const checkUser = () => {
    firebaseClientConnection(firebaseOptions);
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          fetcher.submit(
            { token: (user as User & { accessToken: string }).accessToken },
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
