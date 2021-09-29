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
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    indent: [1, 2],
    semi: [1, 'always'],
    quotes: [1, 'single'],
    'eol-last': [2, 'always'],
    'quote-props': [2, 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
    'brace-style': [1, '1tbs'],
    'template-curly-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'require-await': 2,
    'no-return-await': 2,
    'react/jsx-curly-spacing': [1, { when: 'never', children: true }],
    'react/prop-types': 0,
    'react/jsx-tag-spacing': [1, { beforeSelfClosing: 'always' }]
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
