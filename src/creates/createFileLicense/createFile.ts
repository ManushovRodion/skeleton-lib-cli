import { writeFile } from 'node:fs/promises';
import { format, type Options as PrettierConfig } from 'prettier';

import type { State } from './types';

import { FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generator } from './generator';

export function createFile(prettierConfig: PrettierConfig) {
  const state = defineState();

  const updateCopyright = (copyright: State['copyright']) => {
    state.copyright = copyright;
  };

  const render = async (outDir: string) => {
    const context = generator(state);
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
    updateCopyright,

    render,
  };
}
