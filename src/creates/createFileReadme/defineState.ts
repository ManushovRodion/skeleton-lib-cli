import type { State } from './types';

export const defineState = (): State => ({
  name: '',
  description: '',

  license: '',
  isMultiLangDocs: false,

  lang: 'ru',

  langsURL: [],
  rootPathURL: '',
});
