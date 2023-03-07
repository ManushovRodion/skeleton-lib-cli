import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileNVMRC } from '../index';
import prettierConfig from './../../../../.prettierrc.json';

const FILE_NAME = '.nvmrc';
const DIR_TEST = './src/creates/createFileNVMRC/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileNVMRC', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileNVMRC(PRETTER_CONFIG);
    const pathStab = `${DIR_TEST}/stabs/stab.txt`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStab, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
