import { questionURLHome } from '../questionURLHome';
import * as PromptText from '../../../prompts/promptText';

describe('questions/url/questionURLHome', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('');
  });

  it('Данные возврщаются через функцию promptText', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('value');

    const value = await questionURLHome('');
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionURLHome('');

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.url.home');
  });

  it('Дефолтное значение пробрасывается в функцию promptText', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionURLHome('value');

    const message = promptText.mock.calls[0][1];
    expect(message?.defaultValue).toBe('value');
  });
});
