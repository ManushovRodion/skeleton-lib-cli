import { writeFile } from 'node:fs/promises';
import { format, type Options as PrettierConfig } from 'prettier';

import { LANG_FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generatorMultilang } from './generatorMultilang';

export function createFileMultilang(prettierConfig: PrettierConfig) {
  const state = defineState();

  const updateName = (name: string) => {
    state.name = name;
  };

  const updateVersion = (version: string) => {
    state.version = version;
  };

  const updateLangsURL = (langs: string[]) => {
    state.langsURL = langs.map((lang) => lang.toLowerCase());
  };

  const updateRootPathURL = (rootPathURL: string) => {
    state.rootPathURL = rootPathURL;
  };

  const render = (outDir: string, langActive: string) => {
    state.isMultiLangDocs = true;
    state.lang = langActive.toLowerCase();

    if (!state.langsURL.includes(state.lang)) {
      state.lang = state.langsURL[0];
    }

    const context = generatorMultilang(state);
    const fileName = LANG_FILE_NAME.replace('LANG', state.lang.toUpperCase());

    const path = `${outDir}/${fileName}`;

    const data = format(context, {
      parser: 'markdown',
      ...prettierConfig,
    });

    return writeFile(path, data, {
      encoding: 'utf8',
    });
  };

  return {
    updateName,
    updateVersion,
    updateLangsURL,
    updateRootPathURL,

    render,
  };
}
