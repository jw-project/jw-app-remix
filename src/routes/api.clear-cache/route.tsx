import { json, type ActionFunction } from '@remix-run/server-runtime';

import { cacheConfigs, cacheUser } from '~/utils/cache.server';

export const action: ActionFunction = () => {
  cacheConfigs.del(['resources', 'menu']);
  cacheUser.del(cacheUser.keys());

  return json('ok');
};
