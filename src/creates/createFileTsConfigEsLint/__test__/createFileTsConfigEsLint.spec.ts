import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileTsConfigEsLint } from '../index';
import prettierConfig from '../../../../.prettierrc.json';

const FILE_NAME = 'tsconfig.eslint.json';
const DIR_TEST = './src/creates/createFileTsConfigEsLint/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileTsConfigEsLint', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileTsConfigEsLint(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBaseParams.json`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
