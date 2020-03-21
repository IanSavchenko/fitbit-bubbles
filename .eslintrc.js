module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'ban'
  ],
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'off',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-console': [
      'warn'
    ],
    'quote-props': [
      'error',
      'as-needed'
    ],
    'default-case': [
      'error'
    ],
    'object-curly-spacing': [
      'error',
      'never'
    ],
    'ban/ban': [
      'error', {
        name: 'runDemo',
        message: 'should not use demo in prod'
      }
    ]
  }
};