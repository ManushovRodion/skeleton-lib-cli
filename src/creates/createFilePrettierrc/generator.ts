export function generator() {
  const context = {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
  };

  return JSON.stringify(context);
}
