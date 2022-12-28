import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect } from 'react';
import {
  LoadingSubtitle, LoadingTitle, Overlay, Spinner,
} from '~/components/login/login';
import { firebaseClientConnection } from '~/services/firebase-connection.client';
import { sessionLogin } from '~/services/firebase-connection.server';
import type { LoginLoaderReturn } from '~/types/types';

export const action: ActionFunction = async ({ request }) => redirect('/', {
  headers: {
    'Set-Cookie': await sessionLogin(request),
  },
});

export const loader: LoaderFunction = async () => {
  const loginLoaderReturn: LoginLoaderReturn = {
    firebaseConfig: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  };

  return loginLoaderReturn;
};

export default function Login() {
  const fetcher = useFetcher();
  const { firebaseConfig } = useLoaderData<LoginLoaderReturn>();

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
    firebaseClientConnection(firebaseConfig);
    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Overlay>
      <Spinner />
      <LoadingTitle>Aguarde...</LoadingTitle>
      <LoadingSubtitle>
        Estamos validando o seu login, isso pode levar uns segundos.
      </LoadingSubtitle>
    </Overlay>
  );
}
