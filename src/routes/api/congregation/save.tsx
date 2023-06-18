import type { ActionFunction } from '@remix-run/server-runtime';

import type { CongregationEntity } from '~/entities/congregation';
import { saveCongregation } from '~/services/api/congregation/congregation.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export const action: ActionFunction = async ({ request }) => {
  const congregation: CongregationEntity = await request.json();
  const { congregationId, permissions, displayName, email } =
    await getAuthenticatedUser(request);

  return saveCongregation({
    congregation,
    congregationId,
    permissions,
    displayName,
    email,
  });
};
