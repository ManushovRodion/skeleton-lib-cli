import { questionAuthorURL } from '../questionAuthorURL';
import * as PromptText from '../../../prompts/promptText';

describe('questions/author/questionAuthorURL', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('');
  });

  it('Данные возврщаются через promptText', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('value');

    const value = await questionAuthorURL();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorURL();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.author.url');
  });
});
