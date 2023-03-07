import type { State } from './types';
import { FUNCTION_CLI, FUNCTION_SUM } from './constants';

export function generator(state: State) {
  if (state.isCommandLineInterface) {
    return `
      ${FUNCTION_SUM}

      ${FUNCTION_CLI}
    `;
  }

  return FUNCTION_SUM;
}
