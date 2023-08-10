import type { AllPermissions, Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';

import type { ForbiddenError } from '../throws-errors';

export abstract class ValidatePermissions<T extends boolean | ForbiddenError> {
  abstract returnValidate(): T;

  protected permissions: Permissions;

  protected permission: AllPermissions;

  constructor(permissions: Permissions, permission: AllPermissions) {
    this.permissions = permissions;
    this.permission = permission;
  }

  private findPermission() {
    return this.permissions[this.permission] || PermissionsEnum.NOT;
  }

  canRead(): T | true {
    const permissionFinded = this.findPermission();
    if (
      ![PermissionsEnum.READ, PermissionsEnum.EDIT].includes(permissionFinded)
    ) {
      return this.returnValidate();
    }

    return true;
  }

  canWrite(): T | true {
    const permissionFinded = this.findPermission();

    if (PermissionsEnum.EDIT !== permissionFinded) {
      return this.returnValidate();
    }

    return true;
  }
}
