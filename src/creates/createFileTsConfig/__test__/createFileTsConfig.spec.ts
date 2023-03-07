import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileTsConfig } from '../index';
import prettierConfig from './../../../../.prettierrc.json';

const FILE_NAME = 'tsconfig.json';
const DIR_TEST = './src/creates/createFileTsConfig/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileTsConfig', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileTsConfig(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stub.json`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
