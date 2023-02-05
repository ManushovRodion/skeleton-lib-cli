import { questionLicense } from '../questionLicense';
import * as PromptToggle from '../../../prompts/promptToggle';

describe('questions/questionLicense', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptToggle = jest.spyOn(PromptToggle, 'promptToggle');
    promptToggle.mockResolvedValue(false);
  });

  it('Данные возврщаются через функцию promptToggle', async () => {
    const promptToggle = jest.spyOn(PromptToggle, 'promptToggle');
    promptToggle.mockResolvedValue(true);

    const value = await questionLicense();
    expect(value).toBeTruthy();
  });

  it('Корректный ключ локализации', async () => {
    const promptToggle = jest.spyOn(PromptToggle, 'promptToggle');

    await questionLicense();

    const message = promptToggle.mock.calls[0][0];
    expect(message).toBe('questionsMessage.license.toggle');
  });
});
