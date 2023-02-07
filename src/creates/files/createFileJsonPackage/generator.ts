import * as constants from './constants';
import type { Package, State } from './types';

export function generator(state: State) {
  const data: Package = {
    name: state.name,
    version: state.version,
  };

  if (state.description) {
    data.description = state.description;
  }

  data.keywords = [];

  if (state.license) {
    data.license = state.license;
  }

  if (state.url.home) {
    data.homepage = state.url.home;
  }

  data.files = ['dist'];

  data.main = `dist/${state.name}.cjs.js`;
  data.unpkg = `dist/${state.name}.umd.js`;
  data.module = `dist/${state.name}.es.js`;
  data.types = `dist/${state.name}.d.ts`;

  if (state.isCommandLineInterface) {
    data.bin = {};
    data.bin[state.name] = './bin/cli.js';
  }

  data.scripts = {};
  data.scripts.build = constants.CLI_SCRIPT_BUILD;

  if (state.codeStyle.isESLint) {
    data.scripts.lint = constants.CLI_SCRIPT_LINT;
  }

  if (state.codeStyle.isPretter) {
    data.scripts['lint:format'] = constants.CLI_SCRIPT_LINT_FORMAT;
  }

  if (state.unitTest.isJest) {
    data.scripts.test = constants.CLI_SCRIPT_TEST;
  }

  if (state.author.email || state.author.url) {
    data.author = state.author;
  } else {
    data.author = state.author.name;
  }

  if (state.url.repository) {
    data.repository = {
      type: 'git',
      url: `git+${state.url.repository}.git`,
    };
  }

  if (state.url.issues) {
    data.bugs = {
      url: state.url.issues,
    };
  }

  data.dependencies = {};
  data.devDependencies = {
    ...constants.DEV_DEPENDENCIES_BASE,
  };

  if (state.codeStyle.isESLint) {
    data.devDependencies = {
      ...data.devDependencies,
      ...constants.DEV_DEPENDENCIES_ESLINT,
    };
  }

  if (state.codeStyle.isPretter) {
    data.devDependencies = {
      ...data.devDependencies,
      ...constants.DEV_DEPENDENCIES_PRETTIER,
    };
  }

  if (state.codeStyle.isESLint && state.codeStyle.isPretter) {
    data.devDependencies = {
      ...data.devDependencies,
      ...constants.DEV_DEPENDENCIES_ESLINT_PRETTIER,
    };
  }

  if (state.unitTest.isJest) {
    data.devDependencies = {
      ...data.devDependencies,
      ...constants.DEV_DEPENDENCIES_JEST,
    };
  }

  if (
    state.codeStyle.isESLint ||
    state.codeStyle.isPretter ||
    state.unitTest.isJest
  ) {
    data.devDependencies['husky'] = '8.0.3';
    data.husky = {
      hooks: {},
    };

    if (state.codeStyle.isESLint || state.codeStyle.isPretter) {
      data.devDependencies['lint-staged'] = '13.1.0';
      data.husky.hooks['pre-commit'] = 'lint-staged';
      data['lint-staged'] = {};

      if (state.codeStyle.isPretter) {
        data['lint-staged']['*.*'] = 'yarn lint:format';
      }

      if (state.codeStyle.isESLint) {
        data['lint-staged']['*.ts'] = 'yarn lint';
      }
    }

    if (state.unitTest.isJest) {
      data.husky.hooks['pre-push'] = 'yarn test';
    }
  }

  return data;
}
