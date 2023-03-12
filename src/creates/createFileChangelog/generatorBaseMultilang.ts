import type { State } from './types';

import {
  CONTEXT_MENU,
  PATTERN_BLOCK_TITLE_H1,
  LANG_FILE_NAME,
} from './constants';
import { validationRequired } from './validationRequired';

export function generatorBaseMultilang(state: State) {
  validationRequired(state.name, 'name');
  validationRequired(state.version, 'version');
  validationRequired(state.langsURL, 'langsURL');
  validationRequired(state.rootPathURL, 'rootPathURL');

  const name = PATTERN_BLOCK_TITLE_H1.replace(
    'TITLE',
    state.name.toUpperCase()
  );

  const menu = state.langsURL
    .map((lang) => {
      const langName = lang.toUpperCase();
      const label = CONTEXT_MENU[lang] || `[${langName}]`;
      const fileName = LANG_FILE_NAME.replace('LANG', langName);
      const url = `${state.rootPathURL}/${fileName}\n`;

      return `- ${label}(${url})\n`;
    })
    .join('\n');

  return [name, menu].join('\n');
}
