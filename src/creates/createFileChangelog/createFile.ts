import { writeFile } from 'node:fs/promises';
import { format, type Options as PrettierConfig } from 'prettier';

import { FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generatorBase } from './generatorBase';
import { generatorBaseMultilang } from './generatorBaseMultilang';

export function createFile(prettierConfig: PrettierConfig) {
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

  const onMultiLangDocs = () => (state.isMultiLangDocs = true);

  const render = async (outDir: string) => {
    const context = state.isMultiLangDocs
      ? generatorBaseMultilang(state)
      : generatorBase(state);

    const path = `${outDir}/${FILE_NAME}`;

    const data = await format(context, {
      parser: 'markdown',
      ...prettierConfig,
    });

    return await writeFile(path, data, {
      encoding: 'utf8',
    });
  };

  return {
    updateName,
    updateVersion,
    updateLangsURL,
    updateRootPathURL,
    onMultiLangDocs,

    render,
  };
}
