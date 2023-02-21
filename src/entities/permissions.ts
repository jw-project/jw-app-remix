export enum PermissionsEnum {
  EDIT = 'EDIT',
  READ = 'READ',
  NOT = 'NOT',
}

export type Permissions = {
  admin: boolean;
  congregation: PermissionsEnum;
  groups?: PermissionsEnum;
  publishers?: PermissionsEnum;
};

export type PermissionsWithoutAdmin = keyof Omit<Permissions, 'admin'>;
