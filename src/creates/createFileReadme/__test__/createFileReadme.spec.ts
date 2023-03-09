import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileReadme } from '../index';
import prettierConfig from '../../../../.prettierrc.json';

const FILE_NAME = 'README.md';
const DIR_TEST = './src/creates/createFileReadme/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileReadme', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileReadme(PRETTER_CONFIG);

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }
  });

  it('Кидается исключение, когда неуказаны обязательные параметры для мультиязычности', async () => {
    const file = createFileReadme(PRETTER_CONFIG);
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
    const file = createFileReadme(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBaseParams.md`;

    file.updateName('name');
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл с установленными дополнительными параметрами', async () => {
    const file = createFileReadme(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBasePlusParams.md`;

    file.updateName('name');
    file.updateDescription('description');
    file.updateLicense('MIT');

    file.updateRootPathURL('...'); // не должно отображаться
    file.updateLangsURL(['...']); // не должно отображаться

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  describe('Создается файл с определенной локализацией', () => {
    it('EN', async () => {
      const file = createFileReadme(PRETTER_CONFIG);
      const pathStub = `${DIR_TEST}/stubs/stubBaseENParams.md`;

      file.updateName('name');
      file.updateLang('EN');

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });

    it('RU', async () => {
      const file = createFileReadme(PRETTER_CONFIG);
      const pathStub = `${DIR_TEST}/stubs/stubBaseParams.md`;

      file.updateName('name');
      file.updateLang('RU');

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });

    it('RU, так как кроме EN и RU - других нет', async () => {
      const file = createFileReadme(PRETTER_CONFIG);
      const pathStub = `${DIR_TEST}/stubs/stubBaseParams.md`;

      file.updateName('name');
      file.updateLang('Other');

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });
  });

  describe('Создается файл с мультиязычностью', () => {
    it('Базовые параметры', async () => {
      const file = createFileReadme(PRETTER_CONFIG);
      const pathStub = `${DIR_TEST}/stubs/stubMultilangBaseParams.md`;

      file.onMultiLangDocs();
      file.updateName('name');
      file.updateLangsURL(['RU', 'en', 'test']);
      file.updateRootPathURL('./docs');

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });

    it('Дополнительные параметры', async () => {
      const file = createFileReadme(PRETTER_CONFIG);
      const pathStub = `${DIR_TEST}/stubs/stubMultilangBasePlusParams.md`;

      file.onMultiLangDocs();
      file.updateName('name');
      file.updateLangsURL(['RU', 'en']);
      file.updateRootPathURL('./docs');
      file.updateDescription('...'); // не должно отображаться
      file.updateLicense('MIT');

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });
  });
});
