import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileRollupConfig } from '../index';
import prettierConfig from './../../../../.prettierrc.json';

const FILE_NAME = 'rollup.config.ts';
const DIR_TEST = './src/creates/createFileRollupConfig/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileRollupConfig', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileRollupConfig(PRETTER_CONFIG);
    const pathStab = `${DIR_TEST}/stabs/stabFull.ts`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStab, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
