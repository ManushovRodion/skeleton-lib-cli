import { unlink, readFile } from 'node:fs/promises';
import type { Options as PrettierOptions } from 'prettier';

import { createFileReadmeMultilang } from '../index';
import prettierConfig from '../../../../.prettierrc.json';

const DIR_TEST = './src/creates/createFileReadme/__test__';
const PATH_FILE_RU = `${DIR_TEST}/README-RU.md`;
const PATH_FILE_EN = `${DIR_TEST}/README-EN.md`;
const PATH_FILE_TEST = `${DIR_TEST}/README-TEST.md`;
const PRETTER_CONFIG = prettierConfig as PrettierOptions;

describe('createFileReadmeMultilang', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileReadmeMultilang(PRETTER_CONFIG);

    try {
      await file.render(DIR_TEST, 'ru');
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }

    file.updateName('name');

    try {
      await file.render(DIR_TEST, 'ru');
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'langsURL'"));
    }

    file.updateLangsURL(['ru']);

    try {
      await file.render(DIR_TEST, 'ru');
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'rootPathURL'"));
    }
  });

  it('Создается файл с установленными базовыми параметрами', async () => {
    const file = createFileReadmeMultilang(PRETTER_CONFIG);

    file.updateName('name');
    file.updateLangsURL(['ru', 'en', 'test']);
    file.updateRootPathURL('./..');

    await file.render(DIR_TEST, 'ru');
    await file.render(DIR_TEST, 'en');
    await file.render(DIR_TEST, 'test');

    const pathStubRU = `${DIR_TEST}/stubs/stubMultilangParamsRU.md`;
    const contextRU = await readFile(PATH_FILE_RU, { encoding: 'utf-8' });
    const contextResultRU = await readFile(pathStubRU, { encoding: 'utf-8' });
    expect(contextRU).toBe(contextResultRU);

    const pathStubEN = `${DIR_TEST}/stubs/stubMultilangParamsEN.md`;
    const contextEN = await readFile(PATH_FILE_EN, { encoding: 'utf-8' });
    const contextResultEN = await readFile(pathStubEN, { encoding: 'utf-8' });
    expect(contextEN).toBe(contextResultEN);

    const pathStubTEST = `${DIR_TEST}/stubs/stubMultilangParamsTEST.md`;
    const contextTEST = await readFile(PATH_FILE_TEST, { encoding: 'utf-8' });
    const contextResultTEST = await readFile(pathStubTEST, {
      encoding: 'utf-8',
    });
    expect(contextTEST).toBe(contextResultTEST);

    unlink(PATH_FILE_RU);
    unlink(PATH_FILE_EN);
    unlink(PATH_FILE_TEST);
  });

  it('Создается файл с установленными дополнительными параметрами', async () => {
    const file = createFileReadmeMultilang(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubMultilangParamsPlus.md`;

    file.updateName('name');
    file.updateLangsURL(['ru']);
    file.updateRootPathURL('./..');

    file.updateDescription('description');
    file.updateLicense('MIT');

    await file.render(DIR_TEST, 'ru');

    const context = await readFile(PATH_FILE_RU, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE_RU);
  });

  it('Создается файл с первым из значения списка langs, когда активного элемента нет в списке', async () => {
    const file = createFileReadmeMultilang(PRETTER_CONFIG);
    const pathStub = `${DIR_TEST}/stubs/stubMultilangParamsNotFind.md`;

    file.updateName('name');
    file.updateLangsURL(['ru']);
    file.updateRootPathURL('./..');

    await file.render(DIR_TEST, 'test');

    const context = await readFile(PATH_FILE_RU, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE_RU);
  });
});
