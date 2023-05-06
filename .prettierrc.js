/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
  trailingComma: 'all',
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
