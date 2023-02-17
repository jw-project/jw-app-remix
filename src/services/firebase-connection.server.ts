import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { PermissionsEnum } from '~/entities/permissions';
import type { PublisherEntity } from '~/entities/publisher';

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
      console.info('Firebase admin connected', getApps());
    }

    console.info('Firebase admin connected');
  } catch (error) {
    console.error('Firebase admin connect error:', error);
  }
}

export async function getAuthenticatedUser(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const uidUser = session.get('uidUser');

  if (!uidUser) {
    throw Error('No session');
  }

  const userRecord = await getAuth().getUser(uidUser);

  if (!userRecord) {
    console.info('Error fetching auth user data');
    throw Error('No session');
  }

  const { docs: [result] } = await getFirestore()
    .collectionGroup('publishers')
    .where('email', '==', userRecord.email)
    .get();

  const publisherResult = result?.data() as PublisherEntity;
  const publisher: PublisherEntity = {
    ...publisherResult,
    displayName: userRecord.displayName,
    congregationId: result?.ref.parent.parent?.id,
    email: userRecord.email || publisherResult.email,
  };

  if (!publisher.permissions) {
    publisher.permissions = {
      congregation: PermissionsEnum.EDIT,
    };
  }

  console.info(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
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
