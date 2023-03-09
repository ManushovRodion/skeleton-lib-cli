import type { State } from './types';

import {
  CONTEXT_MENU,
  PATTERN_BLOCK_TITLE_H1,
  PATTERN_LICENSE,
  LANG_FILE_NAME,
} from './constants';
import { validationRequired } from './validationRequired';

export function generatorBaseMultilang(state: State) {
  validationRequired(state.name, 'name');
  validationRequired(state.langsURL, 'langsURL');
  validationRequired(state.rootPathURL, 'rootPathURL');

  const name = PATTERN_BLOCK_TITLE_H1.replace(
    'TITLE',
    state.name.toUpperCase()
  );

  let contextLicense = '';
  if (state.license) {
    contextLicense = PATTERN_LICENSE.replace('LICENSE', state.license);
  }

  const menu = state.langsURL
    .map((lang) => {
      const langName = lang.toUpperCase();
      const label = CONTEXT_MENU[lang] || `[${langName}]`;
      const fileName = LANG_FILE_NAME.replace('LANG', langName);
      const url = `${state.rootPathURL}/${fileName}\n`;

      return `- ${label}(${url})\n`;
    })
    .join('\n');

  return [name, menu, contextLicense].join('\n');
}
