import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import { FILE_NAME } from './constants';

import { defineState } from './defineState';
import { generator } from './generator';
import type { Group } from './types';

export function createFile() {
  const state = defineState();

  const pushGroup = (name: Group['name'], items: Group['items']) => {
    state.groups.push({ name, items });
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
    pushGroup,

    render,
  };
}
