import type { State } from './types';

import { validationRequired } from './validationRequired';
import { generatorBase } from './generatorBase';
import { CONTEXT_MENU_INDEX, LANG_FILE_NAME } from './constants';

export function generatorMultilang(state: State) {
  validationRequired(state.name, 'name');
  validationRequired(state.langsURL, 'langsURL');
  validationRequired(state.rootPathURL, 'rootPathURL');

  const context = generatorBase(state);

  const filterList = state.langsURL.filter((lang) => lang !== state.lang);

  const menu = [state.lang, ...filterList]
    .map((lang) => {
      const langName = lang.toUpperCase();
      const fileName = LANG_FILE_NAME.replace('LANG', langName);

      let label = langName;
      let url = `./${fileName}`;

      if (lang === state.lang) {
        label = CONTEXT_MENU_INDEX[lang] || langName;
        url = `${state.rootPathURL}/${fileName}`;
      }

      return `[${label}](${url})`;
    })
    .join(' | ');

  const before = `### readme: ${menu}`;

  return [before, context].join('\n');
}
