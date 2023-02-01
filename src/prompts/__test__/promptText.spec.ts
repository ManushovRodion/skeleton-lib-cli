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

  it('Проверка, что возвращается значение с консоли', async () => {
    prompts.mockResolvedValue({ value: 'value' });

    const value = await promptText('');
    expect(value).toBe('value');
  });

  it('Проверка, что возвращается дефолтное значение, когда не указано значение с консоли', async () => {
    const value = await promptText('', { defaultValue: 'defaultValue' });
    expect(value).toBe('defaultValue');
  });

  it('Проверка, что возвращается пустая строка, когда не указано значение в консоли и нет дефолтного значения', async () => {
    const value = await promptText('');
    expect(value).toBe('');
  });

  it('Проверка, что корректно передаются опции для prompts', async () => {
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

    await promptText('message');

    expect(exit).toBeCalled();
  });
});
