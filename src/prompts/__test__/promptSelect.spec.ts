import { promptSelect, type State } from '../promptSelect';

jest.mock('prompts', () => ({
  ...jest.requireActual('prompts'),
  __esModule: true,
  default: jest.fn(),
}));

describe('prompts/promptSelect', () => {
  it('Проверка, что возвращается значение NONE, когда список пуст', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: 'NONE' });

    const value = await promptSelect('', []);
    expect(value).toBe('NONE');
  });

  it('Проверка, что возвращается значение из списка', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: 'TEST' });

    const value = await promptSelect('', [{ title: 'TITLE', value: 'TEST' }]);
    expect(value).toBe('TEST');
  });

  it('Проверка, что выполнение останавливается, когда нажато CTRL + C', async () => {
    const prompts = require('prompts');
    jest
      .spyOn(process, 'exit')
      .mockImplementation((code: number | undefined) => {
        throw code;
      });

    interface Prompts {
      onState: (state: State) => void;
    }

    prompts.default = async ({ onState }: Prompts) => {
      onState({ aborted: true });
    };

    try {
      await promptSelect('', []);
    } catch (code) {
      expect(code).toBe(0);
    }
  });

  it('Проверка, что корректно передаются опции для prompts', async () => {
    const prompts = require('prompts');
    let options: any = {};

    prompts.default = (opt: any) => {
      options = opt;

      return { value: '' };
    };

    await promptSelect('message', [{ title: 'TITLE', value: 'VALUE' }]);

    expect(options).toHaveProperty('type', 'select');
    expect(options).toHaveProperty('name', 'value');
    expect(options).toHaveProperty('message', 'message: ');
    expect(options).toHaveProperty('choices', [
      { title: 'TITLE', value: 'VALUE' },
      { title: undefined, value: 'NONE' }, // undefined - так как не подтянулась локализация
    ]);
    expect(options).toHaveProperty('initial', 0);
    expect(options).toHaveProperty('onState');
  });
});
