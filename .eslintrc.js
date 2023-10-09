module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: ['./jsconfig.json']
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'off',
    'import/no-extraneous-dependencies': 'off',
    'default-param-last': 'off',
    'no-console': 'off',
    'react/no-unescaped-entities': 'off',
    'no-plusplus': 'off',
    'react/jsx-filename-extension': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off'
  },
  globals: {
    window: false,
    document: false,
    navigator: false,
    TIME_OUT: false,
    BASE_URL: false
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.base.js'
      }
    }
  }
};
