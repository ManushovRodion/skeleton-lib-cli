import { promptText, type State } from './../promptText';

jest.mock('prompts', () => ({
  ...jest.requireActual('prompts'),
  __esModule: true,
  default: jest.fn(),
}));

describe('prompts/promptText', () => {
  it('Проверка, что возвращается значение', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: 'value' });

    const value = await promptText('');
    expect(value).toBe('value');
  });

  it('Проверка, что возвращается дефолтное значение, когда не указано значение с консоли', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: '' });

    const value = await promptText('', { defaultValue: 'defaultValue' });
    expect(value).toBe('defaultValue');
  });

  it('Проверка, что возвращается пустая строка, когда не указано значение с консоли и нет дефолтного значения', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: '' });

    const value = await promptText('');
    expect(value).toBe('');
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
      await promptText('');
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

    await promptText('message', { defaultValue: 'defaultValue', validate });

    expect(options).toHaveProperty('type', 'text');
    expect(options).toHaveProperty('name', 'value');
    expect(options).toHaveProperty('message', 'message: ');
    expect(options).toHaveProperty('initial', 'defaultValue');
    expect(options).toHaveProperty('validate');
    expect(options).toHaveProperty('onState');
  });
});
