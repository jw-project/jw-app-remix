import type { Permissions } from './permissions';

export type PublisherEntity = {
  id: string;
  congregationId: string;
  email: string;
  name: string;
  displayName?: string; // used by firebase
  permissions: Permissions;
};
