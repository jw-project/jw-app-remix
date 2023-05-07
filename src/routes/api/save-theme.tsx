import type { ActionFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';

import { saveTheme } from '~/services/api/user/user.server';

export const action: ActionFunction = async ({ request }) => {
  await saveTheme(request);

  return json('ok');
};
