import { firestore } from 'firebase-admin';

import type { CongregationEntity } from '~/entities/congregation';

import { getData } from './common.server';

export const getCongregation = async (): Promise<CongregationEntity> => {
  // eslint-disable-next-line no-console
  console.log('validações');

  const congregationDoc = await firestore()
    .collection('congregation')
    .doc('UDo3f0eisxrh6cCAgSx2')
    .get();

  return getData(congregationDoc);
};

export const updateCongregation = async (congregation: CongregationEntity) => {
  // eslint-disable-next-line no-console
  console.log('validações');

  return firestore()
    .collection('congregation')
    .doc('UDo3f0eisxrh6cCAgSx2')
    .set(congregation);
};
