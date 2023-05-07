import type { Theme } from '~/atoms-global/theme';

import type { Permissions } from './permissions';

export type PublisherEntity = {
  id: string;
  uidUser: string;
  congregationId: string;
  email: string;
  name: string;
  displayName?: string; // used by firebase
  permissions: Permissions;
  theme: Theme;
  language: string;
};
