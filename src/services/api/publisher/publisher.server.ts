import { firestore } from 'firebase-admin';

import type { PublisherEntity } from '~/entities/publisher';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { getAllData } from '../common.server';
import { canRead } from '../permissions.server';

export const listPublisher = async (
  request: Request,
): Promise<Array<PublisherEntity>> => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);

  canRead(permissions, 'publishers');

  const publisherList = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('publishers')
    .get();

  return getAllData(publisherList, { includeId: true });
};
