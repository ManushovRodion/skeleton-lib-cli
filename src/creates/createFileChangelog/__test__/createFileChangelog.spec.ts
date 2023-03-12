import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileChangelog } from '../index';
import prettierConfig from '../../../../.prettierrc.json';

const FILE_NAME = 'CHANGELOG.md';
const DIR_TEST = './src/creates/createFileChangelog/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileChangelog', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileChangelog(PRETTER_CONFIG);

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }

    file.updateName('name');

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'version'"));
    }
  });

  it('Кидается исключение, когда неуказаны обязательные параметры для мультиязычности', async () => {
    const file = createFileChangelog(PRETTER_CONFIG);
    file.onMultiLangDocs();

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }

    file.updateName('name');

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'version'"));
    }

    file.updateVersion('version');

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'langsURL'"));
    }

    file.updateLangsURL(['...']);

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'rootPathURL'"));
    }
  });

  it('Создается файл с установленными базовыми параметрами', async () => {
    const file = createFileChangelog(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBaseParams.md`;

    file.updateName('name');
    file.updateVersion('1.0.0');
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл с мультиязычностью', async () => {
    const file = createFileChangelog(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubMultilangBaseParams.md`;

    file.onMultiLangDocs();

    file.updateName('name');
    file.updateVersion('1.0.0');
    file.updateLangsURL(['RU', 'en', 'test']);
    file.updateRootPathURL('./docs');

    await file.render(DIR_TEST);
    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
