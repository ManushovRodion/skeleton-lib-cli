export function validatePackageName(message: string, value?: string) {
  const regexp = new RegExp('^[a-z-]+$', 'mg');

  if (!value || !regexp.test(value)) return message;

  return true;
}
