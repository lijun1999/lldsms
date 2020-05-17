module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'indent': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines': 0,
    'spaced-comment': 0,
    'no-irregular-whitespace': 0,
    'no-undef': 0,
    'no-useless-return': 0,
    'no-redeclare': 0,
    'quotes': 0,
    'semi': 0,
    'new-cap': 0,
    'comma-spacing': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
