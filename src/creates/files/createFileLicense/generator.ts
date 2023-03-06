import { DATA_MIT } from './constants';
import type { State } from './types';

export function generator(state: State) {
  if (!state.copyright) {
    throw new Error("Нет значения для 'copyright'");
  }

  return DATA_MIT.replace('##########', state.copyright);
}
