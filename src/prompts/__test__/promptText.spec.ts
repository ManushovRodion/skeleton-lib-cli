import Prompts, { type PromptObject } from 'prompts';
import { promptText } from './../promptText';

jest.mock('prompts');
const prompts = jest.mocked(Prompts);

describe('prompts/promptText', () => {
  beforeEach(() => {
    prompts.mockReset();

    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    prompts.mockResolvedValue({ value: '' });
  });

  it('Нет лишних пробелов до и после строки', async () => {
    prompts.mockResolvedValue({ value: ' TEST ' });

    const value = await promptText('');
    expect(value).toBe('TEST');
  });

  it('Возвращается дефолтное значение, если оно указано', async () => {
    let value = '';

    value = await promptText('', { defaultValue: 'defaultValue' });
    expect(value).toBe('defaultValue');

    value = await promptText('');
    expect(value).toBe('');
  });

  it('Указаны необходимые параметры', async () => {
    await promptText('message', {
      defaultValue: 'defaultValue',
      validate: () => '',
    });

    const props = prompts.mock.calls[0][0] as PromptObject;

    expect(props.type).toBe('text');
    expect(props.name).toBe('value');
    expect(props.onState).toBeTruthy();

    expect(props.initial).toBe('defaultValue');
    expect(props.message).toBe('message: ');
    expect(props.validate).toBeTruthy();
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

    await promptText('message');

    expect(exit).toBeCalled();
  });
});
