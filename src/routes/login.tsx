import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseClientConnection } from '~/services/firebase-connection.client';
import { sessionLogin } from '~/services/firebase-connection.server';

export const action: ActionFunction = async ({ request }) => redirect('/', {
  headers: {
    'Set-Cookie': await sessionLogin(request),
  },
});

export default function Login() {
  const fetcher = useFetcher();

  useEffect(() => {
    firebaseClientConnection();
    checkUser();
  }, []);

  const checkUser = () => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log(user);
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

  const redirectToLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then(() => {})
      .catch(() => {});
  };

  return <></>;
}
