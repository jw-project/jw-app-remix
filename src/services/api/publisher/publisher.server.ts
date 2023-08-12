import { firestore } from 'firebase-admin';

import type { PublisherEntity } from '~/entities/publisher';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { getAllData } from '../common.server';
import { ValidatePermissions } from '../validate-permissions';

export const listPublisher = async (
  request: Request,
): Promise<Array<PublisherEntity>> => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);

  new ValidatePermissions(permissions, 'publishers').canRead();

  const publisherList = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('publishers')
    .get();

  return getAllData(publisherList, { includeId: true });
};
