export function setValueByKey<T>(state: T, key: keyof T, value: T[keyof T]): T {
  if (!value) return state;

  state[key] = value;
  return state;
}
