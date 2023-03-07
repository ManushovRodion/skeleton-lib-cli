import { writeFile } from 'node:fs/promises';
import { format, type Options as PrettierConfig } from 'prettier';

import type { State } from './types';

import { FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generator } from './generator';

export function createFile(prettierConfig: PrettierConfig) {
  const state = defineState();

  const updateName = (name: State['name']) => {
    state.name = name;
  };

  const render = (outDir: string) => {
    const context = generator(state);
    const path = `${outDir}/${FILE_NAME}`;

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

    render,
  };
}
