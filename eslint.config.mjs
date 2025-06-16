import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          mjs: 'always',
        },
      ],
      'no-console': 'warn', // Allow console.log but warn (used in your code)
      'indent': ['error', 2], // 2-space indentation
      'quotes': ['error', 'single'], // Single quotes
      'semi': ['error', 'always'], // Require semicolons
    },
  },
];