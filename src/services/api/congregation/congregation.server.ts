import { firestore } from 'firebase-admin';

import type { CongregationEntity } from '~/entities/congregation';
import type { Permissions } from '~/entities/permissions';

import { getData } from '../common.server';

export const getCongregation = async ({
  congregationId,
}: {
  congregationId: string;
}): Promise<CongregationEntity> => {
  if (!congregationId) {
    return {} as CongregationEntity;
  }

  const congregationDoc = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .get();

  return getData(congregationDoc);
};

export const newCongregation = async ({
  congregation,
  displayName,
  email,
  permissions,
}: {
  congregation: CongregationEntity;
  displayName?: string;
  email: string;
  permissions: Permissions;
}) => {
  const congregationSaved = await firestore()
    .collection('congregation')
    .add(congregation);

  await congregationSaved.collection('publishers').add({
    name: displayName,
    displayName,
    permissions,
    email,
  });

  return congregationSaved.get();
};

export const saveCongregation = async ({
  congregation,
  congregationId,
}: {
  congregation: CongregationEntity;
  congregationId: string;
}) => {
  return firestore()
    .collection('congregation')
    .doc(congregationId)
    .set(congregation);
};

export const findCongregationByNumber = async ({
  number,
}: {
  number: number;
}) => {
  const {
    empty,
    docs: [findedCongregation],
  } = await firestore()
    .collection('congregation')
    .where('number', '==', number)
    .get();

  return !empty && findedCongregation;
};
