import {
  type ActionFunction,
  type TypedResponse,
  json,
} from '@remix-run/server-runtime';

import type { CongregationEntity } from '~/entities/congregation';
import type { Permissions } from '~/entities/permissions';
import { PermissionsEnum } from '~/entities/permissions';
import {
  findCongregationByNumber,
  getCongregation,
  newCongregation,
  saveCongregation,
} from '~/services/api/congregation/congregation.server';
import type { InputError } from '~/services/api/errors';
import { throwInputError } from '~/services/api/errors';
import { canWrite } from '~/services/api/permissions.server';
import type { HttpError } from '~/services/api/throws-errors';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type CongregationActionSaveResponse = {
  congregation: CongregationEntity;
  needReload: boolean;
};

export const action: ActionFunction = async ({
  request,
}): Promise<TypedResponse<InputError> | CongregationActionSaveResponse> => {
  try {
    const congregationReq: CongregationEntity = await request.json();
    const { congregationId, permissions, displayName, email } =
      await getAuthenticatedUser(request);

    const findedCongregation = await findCongregationByNumber({
      number: congregationReq.number,
    });
    if (findedCongregation && findedCongregation.id !== congregationId) {
      return throwInputError({
        field: 'number',
        message: 'routes.congregation.congregation-already-exists',
      });
    }
    if (!congregationId) {
      const fullPermission: Permissions = {
        admin: true,
        congregation: PermissionsEnum.EDIT,
        events: PermissionsEnum.EDIT,
        groups: PermissionsEnum.EDIT,
        publishers: PermissionsEnum.EDIT,
      };

      const savedCongregation = await newCongregation({
        congregation: congregationReq,
        displayName,
        email,
        permissions: fullPermission,
      });

      await getAuthenticatedUser(request, { ignoreCache: true });

      const congregation = await getCongregation({
        congregationId: savedCongregation.id,
      });

      return { congregation, needReload: true };
    }

    canWrite(permissions, 'congregation');

    await saveCongregation({
      congregation: congregationReq,
      congregationId,
    });

    const congregation = await getCongregation({
      congregationId,
    });

    return { congregation, needReload: false };
  } catch (error) {
    const { message, status, feedback } = error as HttpError;

    throw json({ message, feedback }, { status });
  }
};
