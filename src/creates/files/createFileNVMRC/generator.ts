import type { State } from './types';

export function generator(state: State) {
  if (!state.nodeVersion) {
    throw new Error("Нет значения для 'nodeVersion'");
  }

  return `v${state.nodeVersion}`;
}
