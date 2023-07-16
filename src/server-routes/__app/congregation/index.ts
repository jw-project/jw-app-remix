import { type LoaderFunction, json } from '@remix-run/server-runtime';

import type { CongregationEntity } from '~/entities/congregation';
import { getCongregation } from '~/services/api/congregation/congregation.server';
import { canRead } from '~/services/api/permissions.server';
import type { HttpError } from '~/services/api/throws-errors';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export type CongregationLoaderReturn = {
  congregation: CongregationEntity;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<CongregationLoaderReturn> => {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser(request);

    canRead(permissions, 'congregation');

    const congregation = await getCongregation({ congregationId });

    return { congregation };
  } catch (error) {
    const { message, status } = error as HttpError;

    throw json({ message }, { status });
  }
};
