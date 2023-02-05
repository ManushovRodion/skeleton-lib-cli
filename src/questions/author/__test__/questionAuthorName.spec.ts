import { questionAuthorName } from './../questionAuthorName';
import * as PromptText from '../../../prompts/promptText';

describe('questions/author/questionAuthorName', () => {
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

    const value = await questionAuthorName();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorName();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.author.name (base.requiredInput)');
  });

  it('В качестве валидации выступает функция validateRequiredPrompts', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorName();

    const validate = promptText.mock.calls[0][1]?.validate?.name;
    expect(validate).toBe('validateRequiredPrompts');
  });
});
