import { createDirPackage } from '../createDirPackage';
import fs from 'node:fs/promises';

describe('creates/dirs/createDirPackage', () => {
  it('В функцию mkdir пробрасывается корректный путь', async () => {
    const mkdir = jest.spyOn(fs, 'mkdir');

    await createDirPackage('test');

    const path = mkdir.mock.calls[0][0];
    expect(path).toBe('test');
  });

  it('Корректный ключ локализации для исключения метода', async () => {
    const mkdir = jest.spyOn(fs, 'mkdir');
    mkdir.mockImplementation(() => {
      throw new Error('error');
    });

    try {
      await createDirPackage('test');
    } catch (e) {
      expect(String(e)).toBe('error.notCreateDirPackage');
    }
  });
});
