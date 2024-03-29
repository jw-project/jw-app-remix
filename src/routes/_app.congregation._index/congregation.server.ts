import { type LoaderFunction } from '@remix-run/server-runtime';

import type { CongregationEntity } from '~/entities/congregation';
import { getCongregation } from '~/services/api/congregation/congregation.server';
import { sendReturnMessage } from '~/services/api/throws-errors';
import type { ActionResponse } from '~/services/api/types';
import { ValidatePermissions } from '~/services/api/validate-permissions';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type CongregationLoaderReturn = {
  congregation: CongregationEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): ActionResponse<CongregationLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    new ValidatePermissions(permissions, 'congregation').canRead();

    const congregation = await getCongregation({ congregationId });

    return { congregation };
  } catch (error) {
    throw sendReturnMessage(error);
  }
};
