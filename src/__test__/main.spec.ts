import { cli } from './../main';
import * as RunCreate from './../runCreate';

describe('main', () => {
  it('Отлавливаем исключения из функции runCreate', async () => {
    const runCreate = jest.spyOn(RunCreate, 'runCreate');

    runCreate.mockImplementation(async () => {
      throw new Error('error_message');
    });

    try {
      await cli(process);
    } catch (e) {
      expect(String(e)).toBe('Error: error_message');
    }
  });
});
