import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

import { FILE_NAME } from './constants';
import { generator } from './generator';

export function createFile() {
  const render = (outDir: string) => {
    const context = generator();
    const path = `${outDir}/${FILE_NAME}`;

    const data = format(context, {
      parser: 'typescript',
    });

    return writeFile(path, data, {
      encoding: 'utf8',
    });
  };

  return {
    render,
  };
}
