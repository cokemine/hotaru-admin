module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  plugins: ['@typescript-eslint', 'react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    indent: [1, 2],
    semi: [1, 'always'],
    quotes: [1, 'single'],
    'brace-style': [1, '1tbs'],
    'object-curly-spacing': [1, 'always'],
    'react/jsx-curly-spacing': [1, 'always'],
    'require-await': 2,
    'no-return-await': 2,
    'react/prop-types': 0
  },
  settings: {
    react: {
      version: 'latest'
    }
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
