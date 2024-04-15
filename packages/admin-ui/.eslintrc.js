module.exports = {
  extends: ['@review-canvas/eslint-config/react.js'],
  rules: {
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@ui/**/*',
            group: 'index',
          },
        ],
      },
    ],
  },
};
