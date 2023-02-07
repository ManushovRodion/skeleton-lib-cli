export type License = 'MIT' | '';

export type MapObject = { [key: string]: string };

export interface StateAuthor {
  name: string;
  email: string;
  url: string;
}

export interface StateURL {
  home: string;
  repository: string;
  issues: string;
}

export interface StateCodeStyle {
  isESLint: boolean;
  isPretter: boolean;
}

export interface StateUnitTest {
  isJest: boolean;
}

export interface State {
  name: string;
  version: string;
  description: string;
  license: License;

  author: StateAuthor;
  url: StateURL;

  codeStyle: StateCodeStyle;
  unitTest: StateUnitTest;

  isPrivate: boolean;
  isCommandLineInterface: boolean;
  isMultiLangDocs: boolean;
}

export interface Package {
  name: string;

  version?: string;
  description?: string;

  keywords?: string[];
  license?: License;

  homepage?: string;
  files?: string[];

  main?: string;
  unpkg?: string;
  module?: string;
  types?: string;

  bin?: MapObject;

  scripts?: {
    build?: string;
    lint?: string;
    'lint:format'?: string;
    test?: string;
  };

  author?: StateAuthor | string;

  repository?: {
    type: 'git';
    url: string;
  };

  bugs?: {
    url: string;
  };

  dependencies?: MapObject;
  devDependencies?: MapObject;

  husky?: {
    hooks: {
      'pre-commit'?: string;
      'pre-push'?: string;
    };
  };

  'lint-staged'?: MapObject;
}
