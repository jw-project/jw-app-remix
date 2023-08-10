import { firestore } from 'firebase-admin';

import type { PublisherEntity } from '~/entities/publisher';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { getAllData } from '../common.server';
import { ValidatePermissionsServer } from '../validate-permissions/permissions.server';

export const listPublisher = async (
  request: Request,
): Promise<Array<PublisherEntity>> => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);

  new ValidatePermissionsServer(permissions, 'publishers').canRead();

  const publisherList = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('publishers')
    .get();

  return getAllData(publisherList, { includeId: true });
};
