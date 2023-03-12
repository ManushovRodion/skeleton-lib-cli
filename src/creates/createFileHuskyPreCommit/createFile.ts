import { writeFile } from 'node:fs/promises';

import { FILE_NAME } from './constants';
import { defineState } from './defineState';
import { generator } from './generator';

export function createFile() {
  const state = defineState();

  const onESLint = () => (state.isEslint = true);
  const onPrettier = () => (state.isPrettier = true);

  const render = (outDir: string) => {
    const context = generator(state);
    const path = `${outDir}/${FILE_NAME}`;

    return writeFile(path, context, {
      encoding: 'utf8',
    });
  };

  return {
    onESLint,
    onPrettier,

    render,
  };
}
