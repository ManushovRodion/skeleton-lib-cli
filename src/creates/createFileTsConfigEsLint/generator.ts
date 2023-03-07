export function generator() {
  const context = {
    extends: './tsconfig.json',
  };

  return JSON.stringify(context);
}
