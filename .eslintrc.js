module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended' ],
  plugins: [ '@typescript-eslint', 'react' ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    indent: [ 1, 2 ],
    semi: [ 1, 'always' ],
    quotes: [ 1, 'single' ],
    'max-len': [ 1, 120 ],
    'eol-last': [ 1, 'always' ],
    'array-bracket-spacing': [ 1, 'always' ],
    'template-curly-spacing': [ 1, 'always' ],
    'brace-style': [ 1, '1tbs' ],
    'object-curly-spacing': [ 1, 'always' ],
    'require-await': 2,
    'no-return-await': 2,
    '@typescript-eslint/no-explicit-any': 0,
    'react/jsx-curly-spacing': [ 1, { 'when': 'always', 'children': true } ],
    'react/prop-types': 0,
    'react/jsx-tag-spacing': [ 1, { beforeSelfClosing: 'always' } ]
  },
  settings: {
    react: {
      version: 'latest'
    }
  },
  overrides: [
    {
      files: [ '*.js' ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
