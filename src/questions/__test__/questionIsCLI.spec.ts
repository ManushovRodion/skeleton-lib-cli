import { questionIsCLI } from '../questionIsCLI';
import * as PromptToggle from '../../prompts/promptToggle';

describe('questions/questionIsCLI', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptToggle = jest.spyOn(PromptToggle, 'promptToggle');
    promptToggle.mockResolvedValue(false);
  });

  it('Данные возврщаются через promptText', async () => {
    const promptToggle = jest.spyOn(PromptToggle, 'promptToggle');
    promptToggle.mockResolvedValue(true);

    const value = await questionIsCLI();
    expect(value).toBeTruthy();
  });

  it('Корректный ключ локализации', async () => {
    const promptToggle = jest.spyOn(PromptToggle, 'promptToggle');

    await questionIsCLI();

    const message = promptToggle.mock.calls[0][0];
    expect(message).toBe('questionsMessage.cli');
  });
});
