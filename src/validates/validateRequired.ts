export function validateRequired(message: string, value?: string | string[]) {
  if (!value?.length) return message;

  return true;
}
