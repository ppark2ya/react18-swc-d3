module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-nested-ternary': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': [
      'error',
      require('os').EOL === '\r\n' ? 'windows' : 'unix',
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  globals: {
    React: 'writable',
    document: false,
    Map: false,
    Promise: false,
  },
  ignorePatterns: ['node_modules/', '*.js'],
};
