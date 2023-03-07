import { unlink, readFile } from 'node:fs/promises';

import { createFileGitignore } from '../index';

const FILE_NAME = '.gitignore';
const DIR_TEST = './src/creates/createFileGitignore/__test__';
const PATH_FILE = `${DIR_TEST}/${FILE_NAME}`;

describe('createFileNVMRC', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileGitignore();
    const pathStab = `${DIR_TEST}/stabs/stab.txt`;

    await file.render(DIR_TEST);

    const context = await readFile(PATH_FILE, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStab, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(PATH_FILE);
  });
});
