import { questionAuthorEmail } from '../questionAuthorEmail';
import * as PromptText from '../../../prompts/promptText';

describe('questions/author/questionAuthorEmail', () => {
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

    const value = await questionAuthorEmail();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorEmail();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.author.email');
  });
});
