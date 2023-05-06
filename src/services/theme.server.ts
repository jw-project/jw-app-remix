import type { RootLoaderReturn } from '~/root';

import { commitSession, getSession } from './session.server';

export async function getSessionTheme(
  request: Request,
): Promise<RootLoaderReturn['themeMode']> {
  const session = await getSession(request.headers.get('Cookie'));

  return session.get('theme') || 'light';
}

export async function saveSessionTheme(request: Request) {
  let theme = await getSessionTheme(request);

  theme = theme === 'light' ? 'dark' : 'light';

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return commitSession(session);
}
