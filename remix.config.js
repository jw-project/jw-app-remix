/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'src',
  tailwind: true,
  serverModuleFormat: 'cjs',
  browserNodeBuiltinsPolyfill: {
    modules: {
      console: true,
    },
  },
};
