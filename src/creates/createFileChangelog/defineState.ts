import type { State } from './types';

export const defineState = (): State => ({
  name: '',
  version: '',

  isMultiLangDocs: false,

  lang: 'ru',

  langsURL: [],
  rootPathURL: '',
});
