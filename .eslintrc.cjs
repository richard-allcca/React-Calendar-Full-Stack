module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '17.0.2' } },
  plugins: ['react-refresh'],
  rules: {
    "max-len": [2, 120, 2],
    "newline-before-return": "error",
    "no-console": "error",
    "no-empty-function": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-spaces": "error",
    "no-param-reassign": ["error", { "props": false }],
    "no-use-before-define": "error", // "off"
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    // "react/prop-types": "error",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "semi": ["error", "always"]
  },
}
