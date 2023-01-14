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
import { useTranslation } from 'react-i18next';
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

export default function Login() {
  const fetcher = useFetcher();
  const { t } = useTranslation('routes', { keyPrefix: 'login' });

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
      <LoadingTitle>{t('wait')}</LoadingTitle>
      <LoadingSubtitle>
        {t('description')}
      </LoadingSubtitle>
    </Overlay>
  );
}
