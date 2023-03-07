import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileJsonPackage } from '../index';
import prettierConfig from './../../../../.prettierrc.json';

const FILE_NAME = 'package.json';
const DIR_TEST = './src/creates/createFileJsonPackage/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileJsonPackage', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);

    try {
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }

    try {
      file.updateName('name');
      await file.render(DIR_TEST);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'version'"));
    }
  });

  it('Создается файл: кейс, когда установлены только обязательные параметры', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBaseParams.json`;

    file.updateName('name');
    file.updateVersion('version');

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  describe('Создается файл: кейс, когда установлены поразному параметры по автору проекта', () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);

    file.updateName('name');
    file.updateVersion('version');

    it('Указано только имя', async () => {
      file.updateAuthor('author_name');
      const pathStub = `${DIR_TEST}/stubs/stubAuthorNameParams.json`;

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });

    it('Указано имя и email', async () => {
      file.updateAuthor('author_name', 'author_email');
      const pathStub = `${DIR_TEST}/stubs/stubAuthorNameAndAuthorEmailParams.json`;

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });

    it('Указано имя и url', async () => {
      file.updateAuthor('author_name', '', 'author_url');
      const pathStub = `${DIR_TEST}/stubs/stubAuthorNameAndAuthorUrlParams.json`;

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });

    it('Указано полное значение автора', async () => {
      file.updateAuthor('author_name', 'author_email', 'author_url');
      const pathStub = `${DIR_TEST}/stubs/stubAuthorFullParams.json`;

      await file.render(DIR_TEST);

      const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
      const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

      expect(context).toBe(contextResult);
      unlink(PATH_FILE);
    });
  });

  it('Создается файл: кейс, когда установлены дополнительные параметры', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubBasePlusParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.updateDescription('description');
    file.updateLicense('MIT');
    file.updateUrlHome('homepage');
    file.updateAuthor('author');
    file.updateUrlRepository('repository');
    file.updateUrlIssues('bugs');

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл: кейс, когда установлены параметры eslint', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubEslintParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.onESLint();

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл: кейс, когда установлены параметры prettier', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubPrettierParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.onPrettier();

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл: кейс, когда установлены параметры eslint и prettier', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubEslintAndPrettierParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.onESLint();
    file.onPrettier();

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл: кейс, когда установлены параметры jest', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubJestParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.onJest();

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл: кейс, когда установлены параметры cli', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubCliParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.onCommandLineInterface();

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл: кейс, когда установлены параметры multilang docs', async () => {
    const file = createFileJsonPackage(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubMultiDocsParams.json`;

    file.updateName('name');
    file.updateVersion('version');
    file.onMultiLangDocs();

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
