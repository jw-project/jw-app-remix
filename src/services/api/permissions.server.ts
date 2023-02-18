import type { Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';

export function canRead(permissions: Permissions, permission: keyof Permissions) {
  return [PermissionsEnum.READ, PermissionsEnum.EDIT].includes(
    permissions[permission] || PermissionsEnum.NOT,
  );
}
