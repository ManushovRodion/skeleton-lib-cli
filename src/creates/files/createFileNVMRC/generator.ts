import type { State } from './types';

export function generator(state: State) {
  return `v${state.nodeVersion}`;
}
