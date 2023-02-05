import Prompts, { type PromptObject } from 'prompts';
import { promptSelect } from '../promptSelect';

jest.mock('prompts');
const prompts = jest.mocked(Prompts);

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

describe('prompts/promptSelect', () => {
  beforeEach(() => {
    prompts.mockReset();

    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    prompts.mockResolvedValue({ value: '' });
  });

  it('Указаны необходимые параметры', async () => {
    await promptSelect('message', [{ title: 'TITLE', value: 'VALUE' }]);

    const props = prompts.mock.calls[0][0] as PromptObject;

    expect(props.type).toBe('select');
    expect(props.name).toBe('value');
    expect(props.initial).toBe(0);
    expect(props.onState).toBeTruthy();

    expect(props.message).toBe('message: ');
    expect(props.choices).toEqual([
      { title: 'TITLE', value: 'VALUE' },
      { title: 'base.not', value: 'NONE' },
    ]);
  });

  // Пока нет такого функционала в propmps и приходится его имитировать самим
  it('Выполнение запроса останавливается при нажатие CTRL + C', async () => {
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
