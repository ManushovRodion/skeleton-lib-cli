import { unlink, readFile } from 'node:fs/promises';

import { FILE_NAME } from './constants';
import { createFileNVMRC } from './index';

const dir = './src/creates/files/createFileNVMRC';
const path = `${dir}/${FILE_NAME}`;

describe('createFileNVMRC', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileNVMRC();
    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(context).toBe('v16.19.0\n');
    unlink(path);
  });
});
