const { createRoutesFromFolders } = require('@remix-run/v1-route-convention');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'src',
  tailwind: true,
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  serverBuildPath: 'build/index.js',
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  },
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes, { appDirectory: 'src' });
  },
};
