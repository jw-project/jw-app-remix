import type { ActionFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';

import { cache } from '../utils/cache';

export const action: ActionFunction = () => {
  cache.del(['resources']);

  return json({ cache: 'clear' });
};
