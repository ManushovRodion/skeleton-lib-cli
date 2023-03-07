import type { State } from './types';
import {
  FUNCTION_CLI,
  FUNCTION_SUM,
  IMPORT_SUM,
  IMPORT_SUM_AND_CLI,
} from './constants';

export function generator(state: State) {
  if (state.isCommandLineInterface) {
    return `
      ${IMPORT_SUM_AND_CLI}

      ${FUNCTION_SUM}

      ${FUNCTION_CLI}
    `;
  }

  return `
    ${IMPORT_SUM}

    ${FUNCTION_SUM}
  `;
}
