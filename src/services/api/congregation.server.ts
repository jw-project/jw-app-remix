import { firestore } from 'firebase-admin';

import type { CongregationEntity } from '~/entities/congregation';

import { getAuthenticatedUser } from '../firebase-connection.server';
import { getData } from './common.server';
import { canRead } from './permissions.server';

export const getCongregation = async (
  request: Request,
): Promise<CongregationEntity> => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);

  if (canRead(permissions, 'congregation') && congregationId) {
    const congregationDoc = await firestore()
      .collection('congregation')
      .doc(congregationId)
      .get();

    return getData(congregationDoc);
  }

  return {} as CongregationEntity;
};

export const updateCongregation = async (congregation: CongregationEntity) => {
  // eslint-disable-next-line no-console
  console.log('validações');

  return firestore()
    .collection('congregation')
    .doc('UDo3f0eisxrh6cCAgSx2')
    .set(congregation);
};
