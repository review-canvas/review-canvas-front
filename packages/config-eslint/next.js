const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo',
  ].map((it) => require.resolve(it)),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
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
    'import/no-default-export': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-definitions': ['off'],
    'no-var': 'error',
    'no-self-assign': 'error',
    'array-bracket-newline': 'off',
    'object-property-newline': 'off',
    'lines-between-class-members': 'off',
    'arrow-parens': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css', 'tw'] }],
    'import/named': 'off',
    'import/order': [
      'warn',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'index', 'parent', 'sibling', 'unknown'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@review-canvas/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/**/*',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};
