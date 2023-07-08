const { createRoutesFromFolders } = require('@remix-run/v1-route-convention');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'src',
  tailwind: true,
  serverBuildPath: 'build/index.js',
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: [/^axios.*/],
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_headers: true,
  },
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes, { appDirectory: 'src' });
  },
};
