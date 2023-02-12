/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    // "airbnb",
    // "airbnb-typescript",
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
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": ["off"],
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        after: true,
      },
    ],
  },
};
