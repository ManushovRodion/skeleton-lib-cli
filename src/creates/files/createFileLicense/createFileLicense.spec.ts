import { unlink, readFile } from 'node:fs/promises';
import { format } from 'prettier';

import { DATA_MIT, FILE_NAME } from './constants';
import { createFileLicense } from './index';

const dir = './src/creates/files/createFileLicense';
const path = `${dir}/${FILE_NAME}`;

describe('createFileLicense', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileLicense();

    try {
      await file.render(dir);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'copyright'"));
    }
  });

  it('Создается файл с установленными параметрами', async () => {
    const file = createFileLicense();

    file.updateCopyright('test');
    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    const result = format(DATA_MIT.replace('##########', 'test'), {
      parser: 'markdown',
    });

    expect(context).toBe(result);
    unlink(path);
  });
});
