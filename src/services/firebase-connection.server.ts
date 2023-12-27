import { error, info } from 'console';

import { firestore } from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { PermissionsEnum } from '~/entities/permissions';
import type { PublisherEntity } from '~/entities/publisher';
import { cacheUser } from '~/utils/cache.server';

import { UnauthorizedError } from './api/throws-errors';
import { commitSession, getSession } from './session.server';

export function firebaseAdminConnection() {
  try {
    if (!process.env.FIREBASE_AUTH) {
      throw new Error('Não foi possível conectar no Firebase');
    }

    const buff = Buffer.from(process.env.FIREBASE_AUTH, 'base64');
    const text = buff.toString('ascii');
    if (!getApps().length) {
      initializeApp({
        credential: cert(JSON.parse(text)),
        databaseURL: 'https://jw-project-dev.firebaseio.com',
        storageBucket: 'gs://jw-project-dev.appspot.com',
      });
      info('Firebase admin connected', getApps());
    }

    info('Firebase admin connected');
  } catch (e) {
    error('Firebase admin connect error:', e);
  }
}

type GetAuthenticatedUserOptions = {
  ignoreCache?: boolean;
};

export async function getAuthenticatedUser(
  request: Request,
  options?: GetAuthenticatedUserOptions,
) {
  const session = await getSession(request.headers.get('Cookie'));
  const uidUser = session.get('uidUser');

  if (!uidUser) {
    throw new UnauthorizedError('No session');
  }

  const cache = cacheUser?.get<PublisherEntity>(uidUser);
  if (cache && !options?.ignoreCache) {
    info(`Successfully load user data from cache: ${JSON.stringify(cache)}`);

    return cache;
  }

  const userRecord = await getAuth().getUser(uidUser);

  if (!userRecord) {
    info('Error fetching auth user data');
    throw new UnauthorizedError('No session');
  }

  const {
    docs: [result],
  } = await firestore()
    .collectionGroup('publishers')
    .where('email', '==', userRecord.email)
    .get();

  const publisherResult = result?.data() as PublisherEntity;
  const publisher: PublisherEntity = {
    ...publisherResult,
    id: result?.id || '',
    uidUser,
    displayName: userRecord.displayName,
    congregationId: result?.ref.parent.parent?.id || '',
    email: userRecord.email || publisherResult.email,
  };

  if (!publisher.permissions) {
    publisher.permissions = {
      admin: true,
      congregation: PermissionsEnum.EDIT,
    };
  }

  cacheUser?.set(uidUser, publisher);

  info(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);

  return publisher;
}

export async function sessionLogin(request: Request) {
  const formData = await request.formData();
  const idToken = formData.get('token')?.toString() || '';

  const decodedToken = await getAuth().verifyIdToken(idToken);

  const session = await getSession(request.headers.get('Cookie'));
  session.set('uidUser', decodedToken.uid);

  return commitSession(session);
}
