import type { State } from './types';

import {
  CONTEXT_TEXT_EMPTY,
  PATTERN_BLOCK_TITLE_H1,
  PATTERN_BLOCK_TITLE_H3,
} from './constants';
import { validationRequired } from './validationRequired';

export function generatorBase(state: State) {
  validationRequired(state.name, 'name');
  validationRequired(state.version, 'version');

  const name = PATTERN_BLOCK_TITLE_H1.replace(
    'TITLE',
    state.name.toUpperCase()
  );

  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const dateString = [year, month, day].join('-');

  const version = PATTERN_BLOCK_TITLE_H3.replace(
    'TITLE',
    `v${state.version} (${dateString})`
  );

  return [name, version, CONTEXT_TEXT_EMPTY].join('\n');
}
