import { unlink, readFile } from 'node:fs/promises';
import { createFileHuskyPrePush } from '../index';

const FILE_NAME = 'pre-push';
const DIR_TEST = './src/creates/createFileHuskyPrePush/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;

describe('createFileHuskyPrePush', () => {
  it('Создается файл без команд', async () => {
    const file = createFileHuskyPrePush();
    const pathStub = `${DIR_TEST}/stubs/stubNotParams.txt`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });

  it('Создается файл c командой jest', async () => {
    const file = createFileHuskyPrePush();
    const pathStub = `${DIR_TEST}/stubs/stubJestParams.txt`;

    file.onJest();
    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStub, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
