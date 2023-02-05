import { questionPackageName } from './../questionPackageName';
import * as PromptText from '../../../prompts/promptText';

describe('questions/author/questionPackageName', () => {
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

    const value = await questionPackageName();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionPackageName();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.package.name (base.requiredInput)');
  });

  it('В качестве валидации выступает функция validatePackageNamePrompts', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionPackageName();

    const validate = promptText.mock.calls[0][1]?.validate?.name;
    expect(validate).toBe('validatePackageNamePrompts');
  });
});
