import Prompts, { type PromptObject } from 'prompts';
import { promptList } from '../promptList';

jest.mock('prompts');
const prompts = jest.mocked(Prompts);

describe('prompts/promptList', () => {
  beforeEach(() => {
    prompts.mockReset();

    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    prompts.mockResolvedValue({ value: [] });
  });

  it('Возвращается дефолтное значение, если оно указано', async () => {
    let value = [];

    value = await promptList('', { defaultValue: ['ru', 'en'] });
    expect(value).toEqual(['ru', 'en']);

    value = await promptList('');
    expect(value).toEqual([]);
  });

  it('Проверка, что возвращается пустой массив, когда не указано значение с консоли и нет дефолтного значения', async () => {
    const value = await promptList('');
    expect(value).toEqual([]);
  });

  it('Указаны необходимые параметры', async () => {
    await promptList('message', {
      defaultValue: ['ru', 'en', 'ch'],
      validate: () => '',
    });

    const props = prompts.mock.calls[0][0] as PromptObject;

    expect(props.type).toBe('list');
    expect(props.name).toBe('value');
    expect(props.separator).toBe(',');
    expect(props.onState).toBeTruthy();

    expect(props.initial).toEqual('ru, en, ch');
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

    await promptList('message');

    expect(exit).toBeCalled();
  });
});
