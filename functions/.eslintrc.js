module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-console': [
      'error',
      {
        allow: [
          'error',
          'warn',
        ],
      },
    ],
  },
};
