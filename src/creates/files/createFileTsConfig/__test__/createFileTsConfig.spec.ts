import { unlink, readFile } from 'node:fs/promises';

import { FILE_NAME } from '../constants';
import { createFileTsConfig } from '../index';

const dir = './src/creates/files/createFileTsConfig/__test__';
const path = `${dir}/${FILE_NAME}`;
const pathStab = `${dir}/stabs/stab.json`;

describe('createFileTsConfig', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileTsConfig();
    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    const contextResult = await readFile(pathStab, { encoding: 'utf-8' });

    expect(context).toBe(contextResult);
    unlink(path);
  });
});
