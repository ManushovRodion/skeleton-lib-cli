import { unlink, readFile } from 'node:fs/promises';
import { format } from 'prettier';

import { FILE_NAME } from './constants';
import { createFileCommandLineInterface } from './index';

const dir = './src/creates/files/createFileCommandLineInterface';
const path = `${dir}/${FILE_NAME}`;

describe('createFileCommandLineInterface', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileCommandLineInterface();

    try {
      await file.render(dir);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }
  });

  it('Создается файл с установленными параметрами', async () => {
    const file = createFileCommandLineInterface();

    file.updateName('test');
    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    const contextBe = `#!/usr/bin/env node\nconst lib = require('../dist/test.cjs.js');\n\nlib.cli(process);`;

    const data = format(contextBe, { parser: 'markdown' });
    expect(context).toBe(data);
    unlink(path);
  });
});
