import { questionPackageDescription } from '../questionPackageDescription';
import * as PromptText from '../../../prompts/promptText';

describe('questions/project/questionPackageDescription', () => {
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

    const value = await questionPackageDescription();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionPackageDescription();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.package.description');
  });
});
