import { InputError } from 'domain-functions';
import { firestore } from 'firebase-admin';

import type { CongregationEntity } from '~/entities/congregation';
import type { Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { getData } from '../common.server';
import { canRead, canWrite } from '../permissions.server';

export const getCongregation = async (
  request: Request,
): Promise<CongregationEntity> => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);

  canRead(permissions, 'congregation');

  if (!congregationId) {
    return {} as CongregationEntity;
  }

  const congregationDoc = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .get();

  return getData(congregationDoc);
};

const newCongregation = async (
  request: Request,
  congregation: CongregationEntity,
) => {
  const { displayName, email } = await getAuthenticatedUser(request);

  const congregationSaved = await firestore()
    .collection('congregation')
    .add(congregation);

  const fullPermission: Permissions = {
    admin: true,
    congregation: PermissionsEnum.EDIT,
    groups: PermissionsEnum.EDIT,
    publishers: PermissionsEnum.EDIT,
  };

  await congregationSaved //
    .collection('publishers') //
    .add({
      name: displayName,
      displayName,
      permissions: fullPermission,
      email,
    });

  await getAuthenticatedUser(request, true);

  return congregationSaved.get();
};

export const saveCongregation = async (
  request: Request,
  congregation: CongregationEntity,
) => {
  const { congregationId, permissions } = await getAuthenticatedUser(request);

  canWrite(permissions, 'congregation');

  const {
    empty,
    docs: [findedCongregation],
  } = await firestore()
    .collection('congregation')
    .where('number', '==', congregation.number)
    .get();

  if (!empty && findedCongregation.id !== congregationId) {
    throw new InputError(
      'routes.congregation.congregation-already-exists',
      'number',
    );
  }

  if (!congregationId) {
    return newCongregation(request, congregation);
  }

  return firestore()
    .collection('congregation')
    .doc(congregationId)
    .set(congregation);
};
