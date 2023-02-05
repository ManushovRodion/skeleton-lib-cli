import Prompts, { type PromptObject } from 'prompts';
import { promptToggle } from '../promptToggle';

jest.mock('prompts');
const prompts = jest.mocked(Prompts);

jest.mock('i18next', () => ({
  t: (key: string) => {
    if (key === 'base.yes') return 'YES';
    if (key === 'base.not') return 'NOT';
    return '';
  },
}));

describe('prompts/promptToggle', () => {
  beforeEach(() => {
    prompts.mockReset();

    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    prompts.mockResolvedValue({ value: false });
  });

  it('Проверка, что передаются нужные, для данного типа поля, опции для prompts', async () => {
    await promptToggle('message');

    const props = prompts.mock.calls[0][0] as PromptObject;

    expect(props.type).toBe('toggle');
    expect(props.name).toBe('value');
    expect(props.initial).toBeTruthy();
    expect(props.active).toBe('YES');
    expect(props.inactive).toBe('NOT');
    expect(props.onState).toBeTruthy();

    expect(props.message).toBe('message? ');
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

    await promptToggle('message');

    expect(exit).toBeCalled();
  });
});
