import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

import { FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generator } from './generator';

import { State } from './types';

export function createFile() {
  const state = defineState();

  const updateName = (name: State['name']) => {
    state.name = name;
  };

  const render = (outDir: string) => {
    const context = generator(state);
    const path = `${outDir}/${FILE_NAME}`;

    const data = format(context, {
      parser: 'markdown',
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
