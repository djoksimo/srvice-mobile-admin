module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  parser: "typescript",
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json"
      }
    }
  ]
};
