import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/server-runtime';
import type { FirebaseOptions } from 'firebase/app';

import { sessionLogin } from '~/services/firebase-connection.server';

export type LoginLoaderReturn = {
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

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectUrl = url.searchParams.get('redirect');

  return redirect(redirectUrl || '/', {
    headers: {
      'Set-Cookie': await sessionLogin(request),
    },
  });
};
