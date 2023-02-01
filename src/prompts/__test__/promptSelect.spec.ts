import Prompts, { type PromptObject } from 'prompts';
import { promptSelect } from '../promptSelect';

jest.mock('prompts');
const prompts = jest.mocked(Prompts);

jest.mock('i18next', () => ({
  t: (key: string) => {
    if (key === 'base.not') return 'NOT';
    return '';
  },
}));

describe('prompts/promptSelect', () => {
  beforeEach(() => {
    prompts.mockReset();

    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    prompts.mockResolvedValue({ value: '' });
  });

  it('Проверка, что возвращается значение NONE, когда список пуст', async () => {
    prompts.mockResolvedValue({ value: 'NONE' });

    const value = await promptSelect('', []);
    expect(value).toBe('NONE');
  });

  it('Проверка, что возвращается значение из списка', async () => {
    prompts.mockResolvedValue({ value: 'TEST' });

    const value = await promptSelect('', [{ title: 'TITLE', value: 'TEST' }]);
    expect(value).toBe('TEST');
  });

  it('Проверка, что корректно передаются опции для prompts', async () => {
    await promptSelect('message', [{ title: 'TITLE', value: 'VALUE' }]);

    const props = prompts.mock.calls[0][0] as PromptObject;

    expect(props.type).toBe('select');
    expect(props.name).toBe('value');
    expect(props.initial).toBe(0);
    expect(props.onState).toBeTruthy();

    expect(props.message).toBe('message: ');
    expect(props.choices).toEqual([
      { title: 'TITLE', value: 'VALUE' },
      { title: 'NOT', value: 'NONE' },
    ]);
  });

  // Пока нет такого функционала в propmps и приходится его имитировать самим
  it('Проверка, что выполнение останавливается, когда нажато CTRL + C, за счет вызова onState, в котором идет вызов process.exit(0)', async () => {
    const exit = jest.spyOn(process, 'exit');
    exit.mockReturnValue(0 as never); // отключение прерывания вызова

    // имитация вызова onState в prompts
    prompts.mockImplementation(async (props) => {
      const prompt = props as PromptObject;
      const value = { value: '' };

      if (prompt?.onState) {
        prompt.onState({ aborted: true }, value, prompt);
      }

      return value;
    });

    await promptSelect('message', []);

    expect(exit).toBeCalled();
  });
});
