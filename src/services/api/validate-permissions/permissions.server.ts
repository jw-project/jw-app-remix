import { ForbiddenError } from '../throws-errors';
import { ValidatePermissions } from './permissions';

export class ValidatePermissionsServer extends ValidatePermissions<ForbiddenError> {
  returnValidate(): ForbiddenError {
    throw new ForbiddenError();
  }
}
