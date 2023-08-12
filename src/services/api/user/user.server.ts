import { firestore } from 'firebase-admin';

import { getAuthenticatedUser } from '~/services/firebase-connection.server';
import { cacheUser } from '~/utils/cache.server';

export const saveTheme = async (request: Request) => {
  const { theme } = await request.json();
  const { congregationId, id, uidUser } = await getAuthenticatedUser(request);

  await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('publishers')
    .doc(id)
    .update({ theme });

  cacheUser?.del(uidUser);
};

// TODO remover não usado
export const saveLanguage = async (request: Request) => {
  const { language } = await request.json();
  const { congregationId, id, uidUser } = await getAuthenticatedUser(request);

  await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('publishers')
    .doc(id)
    .update({ language });

  cacheUser?.del(uidUser);
};
