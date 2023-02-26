import type {
  State,
  StateAuthor,
  StateCodeStyle,
  StateUnitTest,
  StateURL,
} from './types';

export function defineStateAuthor(): StateAuthor {
  return {
    name: '',
    email: '',
    url: '',
  };
}

export function defineStateURL(): StateURL {
  return {
    home: '',
    repository: '',
    issues: '',
  };
}

export function defineStateCodeStyle(): StateCodeStyle {
  return {
    isESLint: false,
    isPrettier: false,
  };
}

export function defineStateUnitTest(): StateUnitTest {
  return {
    isJest: false,
  };
}

export function defineState(): State {
  return {
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
  };
}
