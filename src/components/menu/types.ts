import type { PermissionsWithoutAdmin } from '~/entities/permissions';

import type { IconOpts } from '../commons/icon';

export type MenuListType = {
  label: string;
  icon: IconOpts;
  to: string;
  permissionKey: PermissionsWithoutAdmin;
};

export type MenuType = {
  label: string;
  list: MenuListType[];
};
