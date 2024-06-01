const project = require('node:path').resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: ['@vercel/style-guide/eslint/node', '@vercel/style-guide/eslint/typescript'].map((it) =>
    require.resolve(it),
  ),
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'array-bracket-newline': 'off',
    'object-property-newline': 'off',
    'lines-between-class-members': 'off',
    'arrow-parens': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
