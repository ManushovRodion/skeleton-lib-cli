import { cli } from './../main';
import * as RunCreate from './../runCreate';

describe('main', () => {
  it('Отлавливаем исключения из функции runCreate', async () => {
    const runCreate = jest.spyOn(RunCreate, 'runCreate');
    const consoleMock = jest.spyOn(console, 'error');

    runCreate.mockImplementation(() => {
      throw new Error('error_message');
    });

    await cli(process);

    expect(consoleMock.mock.calls[0].toString()).toBe('Error: error_message');
  });
});
