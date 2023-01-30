import { promptToggle, type State } from '../promptToggle';

jest.mock('prompts', () => ({
  ...jest.requireActual('prompts'),
  __esModule: true,
  default: jest.fn(),
}));

describe('prompts/promptToggle', () => {
  it('Проверка, что возвращается значение', async () => {
    const prompts = require('prompts');
    prompts.default = async () => ({ value: true });

    const valueTrue = await promptToggle('');
    expect(valueTrue).toBeTruthy();

    prompts.default = async () => ({ value: false });

    const valueFalse = await promptToggle('');
    expect(valueFalse).toBeFalsy();
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
      await promptToggle('');
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

    await promptToggle('message');

    expect(options).toHaveProperty('type', 'toggle');
    expect(options).toHaveProperty('name', 'value');
    expect(options).toHaveProperty('message', 'message: ');
    expect(options).toHaveProperty('active');
    expect(options).toHaveProperty('inactive');
    expect(options).toHaveProperty('initial', true);
    expect(options).toHaveProperty('onState');
  });
});
