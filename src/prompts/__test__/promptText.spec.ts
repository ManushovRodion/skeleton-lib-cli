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

  it('Проверка, что убираются пустоты по краям строки', async () => {
    prompts.mockResolvedValue({ value: ' TEST ' });

    const value = await promptText('');
    expect(value).toBe('TEST');
  });

  it('Проверка, что возвращается дефолтное значение, когда не указано значение с prompts', async () => {
    const value = await promptText('', { defaultValue: 'defaultValue' });
    expect(value).toBe('defaultValue');
  });

  it('Проверка, что передаются нужные, для данного типа поля, опции для prompts', async () => {
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
