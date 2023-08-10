import { ValidatePermissions } from './permissions';

export class ValidatePermissionsClient extends ValidatePermissions<boolean> {
  returnValidate(): boolean {
    return false;
  }
}
