import { useMemo } from 'react';

import type { AllPermissions, Permissions } from '~/entities/permissions';
import { ValidatePermissions } from '~/services/api/validate-permissions';

export const useValidatePermissions = (
  permissions: Permissions,
  permission: AllPermissions,
) => {
  const validatePermissions = useMemo(
    () => new ValidatePermissions(permissions, permission),
    [permissions, permission],
  );

  const canWrite = useMemo(() => {
    try {
      validatePermissions.canWrite();

      return true;
    } catch (error) {
      return false;
    }
  }, [validatePermissions]);

  const canRead = useMemo(() => {
    try {
      validatePermissions.canRead();

      return true;
    } catch (error) {
      return false;
    }
  }, [validatePermissions]);

  return {
    canRead,
    canWrite,
  };
};
