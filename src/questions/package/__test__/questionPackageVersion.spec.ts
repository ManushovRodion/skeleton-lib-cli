import { questionPackageVersion } from '../questionPackageVersion';
import * as PromptText from '../../../prompts/promptText';

describe('questions/author/questionPackageVersion', () => {
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

    const value = await questionPackageVersion('0.1.0');
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionPackageVersion('');

    const message = promptText.mock.calls[0][0];
    expect(message).toBe(
      'questionsMessage.package.version (validation.requiredInput)'
    );
  });

  it('В качестве валидации выступает функция validateRequiredPrompts', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionPackageVersion('0.1.0');

    const validate = promptText.mock.calls[0][1]?.validate?.name;
    expect(validate).toBe('validateRequiredPrompts');
  });
});
