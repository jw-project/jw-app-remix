import { type LoaderFunction } from '@remix-run/server-runtime';

import type { CongregationEntity } from '~/entities/congregation';
import { getCongregation } from '~/services/api/congregation/congregation.server';
import { canRead } from '~/services/api/permissions.server';
import { sendReturnMessage } from '~/services/api/throws-errors';
import type { ActionResponse } from '~/services/api/types';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type CongregationLoaderReturn = {
  congregation: CongregationEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): ActionResponse<CongregationLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    canRead(permissions, 'congregation');

    const congregation = await getCongregation({ congregationId });

    return { congregation };
  } catch (error) {
    return sendReturnMessage(error);
  }
};
