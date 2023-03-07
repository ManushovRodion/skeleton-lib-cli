import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileMain } from '../index';
import prettierConfig from '../../../../.prettierrc.json';

const FILE_NAME = 'main.ts';
const DIR_TEST = './src/creates/createFileMain/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileMain', () => {
  it('Создается файл с установленными базовыми параметрами', async () => {
    const file = createFileMain(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBase.ts`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл с установленными cli параметрами', async () => {
    const file = createFileMain(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBaseAndCli.ts`;

    file.onCommandLineInterface();
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
