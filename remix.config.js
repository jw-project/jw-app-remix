const { createRoutesFromFolders } = require('@remix-run/v1-route-convention');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'src',
  tailwind: true,
  server: process.env.NODE_ENV === 'development' ? undefined : './server.ts',
  serverBuildPath: 'build/index.js',
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle:
    process.env.NODE_ENV === 'development' ? undefined : 'all',
  future: {
    v2_dev: true,
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_headers: true,
  },
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes, { appDirectory: 'src' });
  },
};
