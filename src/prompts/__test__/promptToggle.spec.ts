import Prompts, { type PromptObject } from 'prompts';
import { promptToggle } from '../promptToggle';

jest.mock('prompts');
const prompts = jest.mocked(Prompts);

describe('prompts/promptToggle', () => {
  beforeEach(() => {
    prompts.mockReset();

    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    prompts.mockResolvedValue({ value: false });
  });

  it('Указаны необходимые параметры', async () => {
    await promptToggle('message');

    const props = prompts.mock.calls[0][0] as PromptObject;

    expect(props.type).toBe('toggle');
    expect(props.name).toBe('value');
    expect(props.initial).toBeTruthy();
    expect(props.active).toBe('base.yes');
    expect(props.inactive).toBe('base.not');
    expect(props.onState).toBeTruthy();

    expect(props.message).toBe('message? ');
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

    await promptToggle('message');

    expect(exit).toBeCalled();
  });
});
