import type { Permissions } from './permissions';

export type PublisherEntity = {
  congregationId?: string;
  email: string;
  name: string;
  displayName?: string; // used by firebase
  permissions: Permissions;
};
