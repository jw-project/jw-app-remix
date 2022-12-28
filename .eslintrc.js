/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
