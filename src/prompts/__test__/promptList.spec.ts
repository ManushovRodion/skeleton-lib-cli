import { promptList, type State } from '../promptList';

jest.mock('prompts', () => ({
  ...jest.requireActual('prompts'),
  __esModule: true,
  default: jest.fn(),
}));

describe('prompts/promptList', () => {
  it('Проверка, что возвращается значение', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: ['1', '2'] });

    const value = await promptList('');
    expect(value).toEqual(['1', '2']);
  });

  it('Проверка, что возвращается дефолтное значение, когда не указано значение с консоли', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: [] });

    const value = await promptList('', { defaultValue: ['1', '2'] });
    expect(value).toEqual(['1', '2']);
  });

  it('Проверка, что возвращается пустой массив, когда не указано значение с консоли и нет дефолтного значения', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: [] });

    const value = await promptList('');
    expect(value).toEqual([]);
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
      await promptList('');
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

    const validate = () => 'validate';

    await promptList('message', { defaultValue: ['1', '2', '3'], validate });

    expect(options).toHaveProperty('type', 'list');
    expect(options).toHaveProperty('name', 'value');
    expect(options).toHaveProperty('message', 'message: ');
    expect(options).toHaveProperty('initial', '1, 2, 3');
    expect(options).toHaveProperty('separator', ',');
    expect(options).toHaveProperty('validate');
    expect(options).toHaveProperty('onState');
  });
});
