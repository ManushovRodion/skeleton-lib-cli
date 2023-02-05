import { questionURLIssues } from '../questionURLIssues';
import * as PromptText from '../../../prompts/promptText';

describe('questions/url/questionURLIssues', () => {
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

    const value = await questionURLIssues('');
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionURLIssues('');

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.url.issues');
  });

  it('Дефолтное значение пробрасывается в функцию promptText', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionURLIssues('value');

    const message = promptText.mock.calls[0][1];
    expect(message?.defaultValue).toBe('value/issues');
  });
});
