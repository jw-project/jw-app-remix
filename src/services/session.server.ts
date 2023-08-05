import { createCookieSessionStorage } from '@remix-run/node';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'fb:token',
      secrets: [process.env.SESSION_SECRET as string],
    },
  });

export { getSession, commitSession, destroySession };
