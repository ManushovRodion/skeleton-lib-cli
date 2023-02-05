import { questionMultiLangDocsList } from '../questionMultiLangDocsList';
import * as PromptList from '../../../prompts/promptList';

describe('questions/questionMultiLangDocs', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptList = jest.spyOn(PromptList, 'promptList');
    promptList.mockResolvedValue([]);
  });

  it('Данные возврщаются через функцию promptList', async () => {
    const promptList = jest.spyOn(PromptList, 'promptList');
    promptList.mockResolvedValue(['ru']);

    const value = await questionMultiLangDocsList([]);
    expect(value).toEqual(['ru']);
  });

  it('Корректный ключ локализации', async () => {
    const promptList = jest.spyOn(PromptList, 'promptList');

    await questionMultiLangDocsList([]);

    const message = promptList.mock.calls[0][0];
    expect(message).toBe('questionsMessage.multiLangDocs.list');
  });

  it('Дефолтное значение пробрасывается в функцию promptList', async () => {
    const promptText = jest.spyOn(PromptList, 'promptList');

    await questionMultiLangDocsList(['ru', 'en']);

    const message = promptText.mock.calls[0][1];
    expect(message?.defaultValue).toEqual(['ru', 'en']);
  });
});
