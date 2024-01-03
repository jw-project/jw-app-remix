/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ['eslint-config-prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    //eslint common rules
    curly: 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'no-console': 'error',
    'no-nested-ternary': 'error',
    'no-debugger': 'error',
    'no-new-wrappers': 'error',
    'object-shorthand': 'error',
    'no-return-await': 'error',
    'consistent-return': 'error',
    'no-unused-vars': 'off',
    'no-unneeded-ternary': 'error',
    'prefer-template': 'error',
    'no-implicit-coercion': 'error',
    'lines-between-class-members': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'case' },
      { blankLine: 'always', prev: '*', next: 'default' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: '*', next: 'function' },
    ],
    //prettier rules
    'prettier/prettier': 'error',
    //sonarjs rules
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-duplicate-string': 'error',
    'sonarjs/prefer-immediate-return': 'error',
    //typescript-eslint rules
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    //vitest rules
    'vitest/valid-expect': ['error'],
    'vitest/no-conditional-in-test': ['error'],
    'vitest/no-conditional-expect': ['error'],
    'vitest/no-conditional-tests': ['error'],
    'vitest/valid-title': ['error'],
    'vitest/prefer-to-have-length': ['error'],
    'vitest/prefer-each': ['error'],
    'vitest/no-identical-title': ['error'],
    'vitest/no-disabled-tests': ['error'],
    //react rules
    'react/jsx-boolean-value': 'error',
    'react/no-children-prop': 'error',
    'react/self-closing-comp': 'error',
    //etc rules
    'etc/no-commented-out-code': 'error',
    'react/display-name': 'error',
  },
  plugins: [
    'eslint-plugin-prettier',
    'sonarjs',
    '@typescript-eslint',
    'etc',
    'react',
    'vitest',
  ],
};
