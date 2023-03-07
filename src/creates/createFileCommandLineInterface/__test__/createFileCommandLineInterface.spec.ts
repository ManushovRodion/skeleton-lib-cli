import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileCommandLineInterface } from '../index';
import prettierConfig from './../../../../.prettierrc.json';

const FILE_NAME = 'cli.js';
const DIR_TEST = './src/creates/createFileCommandLineInterface/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileCommandLineInterface', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileCommandLineInterface(PRETTER_CONFIG);

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }
  });

  it('Создается файл с установленными параметрами', async () => {
    const file = createFileCommandLineInterface(PRETTER_CONFIG);
    const pathStab = `${DIR_TEST}/stabs/stab.js`;

    file.updateName('name');
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStab, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
