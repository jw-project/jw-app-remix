/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "src",
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  serverBuildPath: "build/index.js",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
