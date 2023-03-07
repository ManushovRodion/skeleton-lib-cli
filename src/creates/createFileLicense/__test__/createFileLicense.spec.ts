import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileLicense } from '../index';
import prettierConfig from './../../../../.prettierrc.json';

const FILE_NAME = 'LICENSE';
const DIR_TEST = './src/creates/createFileLicense/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileLicense', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileLicense(PRETTER_CONFIG);

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'copyright'"));
    }
  });

  it('Создается файл с установленными параметрами', async () => {
    const file = createFileLicense(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubMIT.txt`;

    file.updateCopyright('test');
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
