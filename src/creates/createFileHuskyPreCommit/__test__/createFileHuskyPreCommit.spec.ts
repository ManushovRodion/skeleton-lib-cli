import { unlink, readFile } from 'node:fs/promises';
import { createFileHuskyPreCommit } from '../index';

const FILE_NAME = 'pre-commit';
const DIR_TEST = './src/creates/createFileHuskyPreCommit/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;

describe('createFileHuskyPreCommit', () => {
  it('Создается файл без команд', async () => {
    const file = createFileHuskyPreCommit();
    const pathStub = `${DIR_TEST}/stubs/stubNotParams.txt`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл с командой eslint', async () => {
    const file = createFileHuskyPreCommit();
    const pathStub = `${DIR_TEST}/stubs/stubEslintParams.txt`;

    file.onESLint();
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл с командой prettier', async () => {
    const file = createFileHuskyPreCommit();
    const pathStub = `${DIR_TEST}/stubs/stubPrettierParams.txt`;

    file.onPrettier();
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл со всеми командами', async () => {
    const file = createFileHuskyPreCommit();
    const pathStub = `${DIR_TEST}/stubs/stubFullParams.txt`;

    file.onPrettier();
    file.onESLint();
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
