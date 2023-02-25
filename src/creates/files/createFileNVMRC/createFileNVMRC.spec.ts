import { unlink, readFile } from 'node:fs/promises';

import { FILE_NAME } from './constants';
import { createFileNVMRC } from './index';

const dir = './src/creates/files/createFileNVMRC';
const path = `${dir}/${FILE_NAME}`;

describe('createFileNVMRC', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileNVMRC();

    file.updateNodeVersion('test');
    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(context).toBe('vtest\n');
    unlink(path);
  });

  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileNVMRC();

    try {
      await file.render(dir);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'nodeVersion'"));
    }
  });
});
