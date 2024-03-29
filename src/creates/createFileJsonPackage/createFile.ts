import { writeFile } from 'node:fs/promises';
import { format, type Options as PrettierConfig } from 'prettier';

import type { License } from './types';

import { FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generator } from './generator';

export function createFile(prettierConfig: PrettierConfig) {
  const state = defineState();

  const updateName = (name: string) => {
    state.name = name;
  };

  const updateVersion = (version: string) => {
    state.version = version;
  };

  const updateDescription = (description: string) => {
    state.description = description;
  };

  const updateLicense = (license: License) => {
    state.license = license;
  };

  // author

  const updateAuthor = (name: string, email = '', url = '') => {
    state.author.name = name;
    state.author.email = email;
    state.author.url = url;
  };

  // urls

  const updateUrlRepository = (urlRepository: string) => {
    state.url.repository = urlRepository;
  };

  const updateUrlIssues = (urlIssues: string) => {
    state.url.issues = urlIssues;
  };

  const updateUrlHome = (urlHome: string) => {
    state.url.home = urlHome;
  };

  // ons

  //const onPrivate = () => (state.isPrivate = true);
  const onCommandLineInterface = () => (state.isCommandLineInterface = true);
  const onMultiLangDocs = () => (state.isMultiLangDocs = true);
  const onESLint = () => (state.codeStyle.isESLint = true);
  const onPrettier = () => (state.codeStyle.isPrettier = true);
  const onJest = () => (state.unitTest.isJest = true);

  // render

  const render = async (outDir: string) => {
    const context = generator(state);
    const path = `${outDir}/${FILE_NAME}`;

    const data = await format(JSON.stringify(context), {
      parser: 'json',
      ...prettierConfig,
    });

    return await writeFile(path, data, { encoding: 'utf8' });
  };

  return {
    updateName,
    updateVersion,
    updateDescription,
    updateLicense,

    updateUrlHome,
    updateUrlIssues,
    updateUrlRepository,

    updateAuthor,

    //onPrivate,
    onCommandLineInterface,
    onMultiLangDocs,
    onESLint,
    onPrettier,
    onJest,

    render,
  };
}
