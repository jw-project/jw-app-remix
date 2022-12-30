import type { IconOpts } from '../commons/icon';

export type MenuListType = {
  label: string;
  icon: IconOpts;
  to: string;
};

export type MenuType = {
  label: string;
  list: MenuListType[];
};
