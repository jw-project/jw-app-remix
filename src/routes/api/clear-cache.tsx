import type { ActionFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';

import { cacheConfigs, cacheUser } from '~/utils/cache';

export const action: ActionFunction = () => {
  cacheConfigs.del(['resources', 'menu']);
  cacheUser.del(cacheUser.keys());

  return json('ok');
};
