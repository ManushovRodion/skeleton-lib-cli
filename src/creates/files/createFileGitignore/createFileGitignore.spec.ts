import { unlink, readFile } from 'node:fs/promises';
import { format } from 'prettier';

import { FILE_NAME } from './constants';
import { createFileGitignore } from './index';

const dir = './src/creates/files/createFileGitignore';
const path = `${dir}/${FILE_NAME}`;

describe('createFileNVMRC', () => {
  it('Создается файл с установленными параметрами', async () => {
    let context;

    const file = createFileGitignore();
    await file.render(dir);

    context = await readFile(path, { encoding: 'utf-8' });
    expect(context).toBe('');
    unlink(path);

    file.pushGroup('group-1', ['item-1', 'item-2', 'item-3']);
    file.pushGroup('group-2', ['item-4', 'item-5']);

    await file.render(dir);

    context = await readFile(path, { encoding: 'utf-8' });
    const data = format(context, {
      parser: 'markdown',
    });
    expect(context).toBe(data);
    unlink(path);
  });
});
