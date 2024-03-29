import { writeFile } from 'node:fs/promises';
import { format, type Options as PrettierConfig } from 'prettier';

import { FILE_NAME } from './constants';
import { generator } from './generator';

export function createFile(prettierConfig: PrettierConfig) {
  const render = async (outDir: string) => {
    const context = generator();
    const path = `${outDir}/${FILE_NAME}`;

    const data = await format(context, {
      parser: 'json',
      ...prettierConfig,
    });

    return await writeFile(path, data, {
      encoding: 'utf8',
    });
  };

  return {
    render,
  };
}
