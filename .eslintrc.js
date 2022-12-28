/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": ["error", { allow: ["info", "error"] }],
    "padded-blocks": ["error", "never"],
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        after: true,
      },
    ],
  },
};
