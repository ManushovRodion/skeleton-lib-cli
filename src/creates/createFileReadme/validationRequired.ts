export function validationRequired(value: string | string[], keyError: string) {
  if (!value || !value.length) {
    throw new Error(`Нет значения для '${keyError}'`);
  }
}
