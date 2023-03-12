import type {
  MapObject,
  Package,
  PackageScripts,
  PackageAuthor,
  State,
} from './types';

import {
  CLI_SCRIPT_BUILD,
  CLI_SCRIPT_LINT,
  CLI_SCRIPT_LINT_FORMAT,
  CLI_SCRIPT_TEST,
  DEV_DEPENDENCIES_BASE,
  DEV_DEPENDENCIES_ESLINT,
  DEV_DEPENDENCIES_ESLINT_PRETTIER,
  DEV_DEPENDENCIES_JEST,
  DEV_DEPENDENCIES_PRETTIER,
} from './constants';

import { setValueByKey } from './setValueByKey';
import { validationRequired } from './validationRequired';

export function generator(state: State) {
  let data: Package = {};

  // NAME
  validationRequired(state.name, 'name');
  data = setValueByKey(data, 'name', state.name);

  // VERSION
  validationRequired(state.version, 'version');
  data = setValueByKey(data, 'version', state.version);

  // DESC
  data = setValueByKey(data, 'description', state.description);

  // META
  data = setValueByKey(data, 'keywords', []);

  // LICENSE
  data = setValueByKey(data, 'license', state.license);

  // URL HOME
  data = setValueByKey(data, 'homepage', state.url.home);

  // PUBLICK NPM
  const files = ['dist'];
  if (state.isMultiLangDocs) files.push('docs');
  data = setValueByKey(data, 'files', files);

  // BUILD
  data = setValueByKey(data, 'main', `dist/${state.name}.cjs.js`);
  data = setValueByKey(data, 'unpkg', `dist/${state.name}.umd.js`);
  data = setValueByKey(data, 'module', `dist/${state.name}.es.js`);
  data = setValueByKey(data, 'types', `dist/${state.name}.d.js`);

  // CLI BIN
  if (state.isCommandLineInterface) {
    data = setValueByKey(data, 'bin', {
      [`${state.name}`]: './bin/cli.js',
    });
  }

  // SCRIPTS
  let scripts: PackageScripts = {};

  scripts = setValueByKey(scripts, 'build', CLI_SCRIPT_BUILD);

  if (state.codeStyle.isESLint) {
    scripts = setValueByKey(scripts, 'lint', CLI_SCRIPT_LINT);
  }

  if (state.codeStyle.isPrettier) {
    scripts = setValueByKey(scripts, 'lint:format', CLI_SCRIPT_LINT_FORMAT);
  }

  if (state.unitTest.isJest) {
    scripts = setValueByKey(scripts, 'test', CLI_SCRIPT_TEST);
  }

  if (
    state.codeStyle.isESLint ||
    state.codeStyle.isPrettier ||
    state.unitTest.isJest
  ) {
    scripts = setValueByKey(scripts, 'prepare', 'husky install');
  }

  data = setValueByKey(data, 'scripts', scripts);

  // AUTHOR
  if (state.author.email || state.author.url) {
    let author: PackageAuthor = {};

    author = setValueByKey(author, 'name', state.author.name);
    author = setValueByKey(author, 'email', state.author.email);
    author = setValueByKey(author, 'url', state.author.url);

    if (Object.values(author).length) {
      data = setValueByKey(data, 'author', author);
    }
  } else {
    data = setValueByKey(data, 'author', state.author.name);
  }

  // REPOSITORY
  if (state.url.repository) {
    data = setValueByKey(data, 'repository', {
      type: 'git',
      url: `git+${state.url.repository}.git`,
    });
  }

  if (state.url.issues) {
    data = setValueByKey(data, 'bugs', {
      url: state.url.issues,
    });
  }

  // DEPENDENCIES
  data = setValueByKey(data, 'dependencies', {});

  let devDependencies: MapObject = DEV_DEPENDENCIES_BASE;

  if (state.codeStyle.isESLint) {
    devDependencies = {
      ...devDependencies,
      ...DEV_DEPENDENCIES_ESLINT,
    };
  }

  if (state.codeStyle.isPrettier) {
    devDependencies = {
      ...devDependencies,
      ...DEV_DEPENDENCIES_PRETTIER,
    };
  }

  if (state.codeStyle.isESLint && state.codeStyle.isPrettier) {
    devDependencies = {
      ...devDependencies,
      ...DEV_DEPENDENCIES_ESLINT_PRETTIER,
    };
  }

  if (state.unitTest.isJest) {
    devDependencies = {
      ...devDependencies,
      ...DEV_DEPENDENCIES_JEST,
    };
  }

  data = setValueByKey(data, 'devDependencies', devDependencies);

  return data;
}
