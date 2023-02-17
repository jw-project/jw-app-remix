import type { Permissions } from '~/entities/permissions';

import type { IconOpts } from '../commons/icon';

export type MenuListType = {
  label: string;
  icon: IconOpts;
  to: string;
  permissionKey: keyof Permissions;
};

export type MenuType = {
  label: string;
  list: MenuListType[];
};
