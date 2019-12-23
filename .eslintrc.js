module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/jsx-indent': 0,
    'react/destructuring-assignment': 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
};