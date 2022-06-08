module.exports = {
  printWidth: 80,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
};
