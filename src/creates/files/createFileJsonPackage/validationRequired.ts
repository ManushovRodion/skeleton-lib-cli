export function validationRequired<T = string>(value: T, keyError: string) {
  if (!value) {
    throw new Error(`Нет значения для '${keyError}'`);
  }
}
