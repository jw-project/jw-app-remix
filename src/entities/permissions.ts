export enum PermissionsEnum {
  EDIT = 'EDIT',
  READ = 'READ',
  NOT = 'NOT',
}

export type Permissions = {
  congregation: PermissionsEnum;
  groups?: PermissionsEnum;
  publishers?: PermissionsEnum;
};
