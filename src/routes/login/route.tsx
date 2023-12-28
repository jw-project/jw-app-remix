import { useEffect } from 'react';

import { useFetcher, useLoaderData } from '@remix-run/react';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  type User,
} from 'firebase/auth';

import { Spinner } from '~/components/commons/spinner';
import { useTranslation } from '~/hooks/use-translation';
import { firebaseClientConnection } from '~/services/firebase-connection.client';

import { LoadingSubtitle, LoadingTitle, Overlay } from './components';
import type { LoginLoaderReturn } from './login.server';

export { loader, action } from './login.server';

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
              method: 'POST',
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
  }, []);

  return (
    <Overlay>
      <Spinner />
      <LoadingTitle>{translate('wait')}</LoadingTitle>
      <LoadingSubtitle>{translate('description')}</LoadingSubtitle>
    </Overlay>
  );
}
