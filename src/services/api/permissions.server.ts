import type { AllPermissions, Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';

import { ForbiddenError } from './throws-errors';

function findPermission(permissions: Permissions, permission: AllPermissions) {
  return permissions[permission] || PermissionsEnum.NOT;
}

function throwPermissionError() {
  throw new ForbiddenError();
}

export function canRead(permissions: Permissions, permission: AllPermissions) {
  const permissionFinded = findPermission(permissions, permission);
  if (
    ![PermissionsEnum.READ, PermissionsEnum.EDIT].includes(permissionFinded)
  ) {
    throwPermissionError();
  }
}

export function canWrite(permissions: Permissions, permission: AllPermissions) {
  const permissionFinded = findPermission(permissions, permission);

  if (PermissionsEnum.EDIT !== permissionFinded) {
    throwPermissionError();
  }
}
