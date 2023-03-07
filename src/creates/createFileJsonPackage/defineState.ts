import type {
  State,
  StateAuthor,
  StateCodeStyle,
  StateUnitTest,
  StateURL,
} from './types';

export const defineStateAuthor = (): StateAuthor => ({
  name: '',
  email: '',
  url: '',
});

export const defineStateURL = (): StateURL => ({
  home: '',
  repository: '',
  issues: '',
});

export const defineStateCodeStyle = (): StateCodeStyle => ({
  isESLint: false,
  isPrettier: false,
});

export const defineStateUnitTest = (): StateUnitTest => ({
  isJest: false,
});

export const defineState = (): State => ({
  name: '',
  version: '',
  description: '',
  license: '',

  author: defineStateAuthor(),
  url: defineStateURL(),

  codeStyle: defineStateCodeStyle(),
  unitTest: defineStateUnitTest(),

  isPrivate: false,
  isCommandLineInterface: false,
  isMultiLangDocs: false,
});
