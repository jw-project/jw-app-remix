import type {
  Permissions,
  PermissionsWithoutAdmin,
} from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';

import { ForbiddenError } from './throws-errors';

function findPermission(
  permissions: Permissions,
  permission: PermissionsWithoutAdmin,
) {
  return permissions[permission] || PermissionsEnum.NOT;
}

function throwPermissionError() {
  throw new ForbiddenError();
}

export function canRead(
  permissions: Permissions,
  permission: PermissionsWithoutAdmin,
) {
  const permissionFinded = findPermission(permissions, permission);
  if (
    ![PermissionsEnum.READ, PermissionsEnum.EDIT].includes(permissionFinded)
  ) {
    throwPermissionError();
  }
}

export function canWrite(
  permissions: Permissions,
  permission: PermissionsWithoutAdmin,
) {
  const permissionFinded = findPermission(permissions, permission);

  if (PermissionsEnum.EDIT !== permissionFinded) {
    throwPermissionError();
  }
}
