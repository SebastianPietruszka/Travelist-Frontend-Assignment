module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'eslint:recommended', 'plugin:react/recommended'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['Helpers', './src/helpers'],
        ],
      },
      extensions: ['.js', '.less', '.json', '.vue'],
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react-hooks/exhaustive-deps': 0,
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        exceptions: [''],
      },
    ],
  },
};
